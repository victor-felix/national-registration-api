import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import NationalRegistrationRepository from './port/national-registration-repository';
import RequestValidator from '@usecases/port/request-validator';
import ResultValidator from '@usecases/port/result-validator';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import GetNationalRegistrationByPathUseCase from './get-national-registration-by-path-use-case';
import GetNationalRegistrationByPathRequest from './domain/get-national-registration-by-path-request';
import GetNationalRegistrationByPathError from '@usecases/errors/get-national-registration-by-path-error';
import NationalRegistrationNotFoundError from '@usecases/errors/national-registration-not-found-error';

const nationalRegistrationRepositoryMock: MockProxy<NationalRegistrationRepository> & NationalRegistrationRepository =
  mock<NationalRegistrationRepository>();

const requestValidatorMock:
  MockProxy<RequestValidator<GetNationalRegistrationByPathRequest>>
  & RequestValidator<GetNationalRegistrationByPathRequest> =
  mock<RequestValidator<GetNationalRegistrationByPathRequest>>();

const makeGetNationalRegistrationByPathUseCase = () => new GetNationalRegistrationByPathUseCase(
  requestValidatorMock,
  nationalRegistrationRepositoryMock,
);

describe('V1 Get NationalRegistration By Path Use Case', () => {
  beforeEach(() => {
    mockReset(nationalRegistrationRepositoryMock);
    mockReset(requestValidatorMock);
  });

  test('Should throw if invalid request when the id parameter is null', async () => {
    const useCase = makeGetNationalRegistrationByPathUseCase();
    const request: GetNationalRegistrationByPathRequest = {
      id: null,
    };
    const resultValidator: ResultValidator<GetNationalRegistrationByPathRequest> = {
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

  test('Should throw if nationalRegistration not found', async () => {
    const useCase = makeGetNationalRegistrationByPathUseCase();
    const request: GetNationalRegistrationByPathRequest = {
      id: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<GetNationalRegistrationByPathRequest> = {
      isValid: true,
      fields: { ...request },
    };

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findById.mockResolvedValue(undefined);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.isRight()).toBe(false);
    expect(response.value).toEqual(
      new NationalRegistrationNotFoundError(),
    );
  });

  test('Should throw error when use case fail', async () => {
    const useCase = makeGetNationalRegistrationByPathUseCase();
    const request: GetNationalRegistrationByPathRequest = {
      id: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<GetNationalRegistrationByPathRequest> = {
      isValid: true,
      value: request,
    };
    const error = new Error('Any Error.');

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findById.mockRejectedValue(error);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.isRight()).toBe(false);
    expect(response.value).toEqual(new GetNationalRegistrationByPathError(error));
  });

  test('Should return response when use case success', async () => {
    const useCase = makeGetNationalRegistrationByPathUseCase();
    const request: GetNationalRegistrationByPathRequest = {
      id: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<GetNationalRegistrationByPathRequest> = {
      isValid: true,
      value: request,
    };

    const nationalRegistration = {
      id: request.id,
      number: faker.datatype.string(),
    };

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findById.mockResolvedValue(nationalRegistration);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(false);
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual(nationalRegistration);
  });
});
