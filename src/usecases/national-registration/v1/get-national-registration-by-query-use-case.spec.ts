import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import NationalRegistrationRepository from './port/national-registration-repository';
import RequestValidator from '@usecases/port/request-validator';
import ResultValidator from '@usecases/port/result-validator';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import GetNationalRegistrationByQueryUseCase from './get-national-registration-by-query-use-case';
import GetNationalRegistrationByQueryRequest from './domain/get-national-registration-by-query-request';
import GetNationalRegistrationByQueryError from '@usecases/errors/get-national-registration-by-query-error';
import NationalRegistrationPaginationResponse from './domain/national-registration-pagination-response';

const nationalRegistrationRepositoryMock: MockProxy<NationalRegistrationRepository> & NationalRegistrationRepository =
  mock<NationalRegistrationRepository>();

const requestValidatorMock:
  MockProxy<RequestValidator<GetNationalRegistrationByQueryRequest>>
  & RequestValidator<GetNationalRegistrationByQueryRequest> =
  mock<RequestValidator<GetNationalRegistrationByQueryRequest>>();

const makeGetNationalRegistrationByQueryUseCase = () => new GetNationalRegistrationByQueryUseCase(
  requestValidatorMock,
  nationalRegistrationRepositoryMock,
);

describe('V1 Get NationalRegistration By Query Use Case', () => {
  beforeEach(() => {
    mockReset(nationalRegistrationRepositoryMock);
    mockReset(requestValidatorMock);
  });

  test('Should throw if invalid request when the id parameter is null', async () => {
    const useCase = makeGetNationalRegistrationByQueryUseCase();
    const request: GetNationalRegistrationByQueryRequest = {
      number: null,
    };
    const resultValidator: ResultValidator<GetNationalRegistrationByQueryRequest> = {
      isValid: false,
      fields: { ...request },
    };

    requestValidatorMock.validate.mockReturnValue(resultValidator);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.isRight()).toBe(false);
    expect(response.value).toEqual(
      new InvalidDataError(resultValidator.fields),
    );
  });

  test('Should throw error when use case fail', async () => {
    const useCase = makeGetNationalRegistrationByQueryUseCase();
    const request: GetNationalRegistrationByQueryRequest = {
      number: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<GetNationalRegistrationByQueryRequest> = {
      isValid: true,
      value: request,
    };
    const error = new Error('Any Error.');

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.query.mockRejectedValue(error);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.isRight()).toBe(false);
    expect(response.value).toEqual(new GetNationalRegistrationByQueryError(error));
  });

  test('Should return response when use case success', async () => {
    const useCase = makeGetNationalRegistrationByQueryUseCase();
    const request: GetNationalRegistrationByQueryRequest = {
      number: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<GetNationalRegistrationByQueryRequest> = {
      isValid: true,
      value: request,
    };
    const nationalRegistration = {
      number: faker.datatype.string(),
    };
    const dataNationalRegistrations = {
      data: [nationalRegistration],
      page_total: faker.datatype.number(),
      total: faker.datatype.number(),
      next: faker.datatype.number(),
      previous: faker.datatype.number(),
    } as NationalRegistrationPaginationResponse;

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.query.mockResolvedValue(dataNationalRegistrations);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(false);
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual(dataNationalRegistrations);
  });
});
