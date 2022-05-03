import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import NationalRegistrationRepository from './port/national-registration-repository';
import RequestValidator from '@usecases/port/request-validator';
import ResultValidator from '@usecases/port/result-validator';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import DeleteNationalRegistrationUseCase from './delete-national-registration-use-case';
import DeleteNationalRegistrationRequest from './domain/delete-national-registration-request';
import NationalRegistrationNotFoundError from '@usecases/errors/national-registration-not-found-error';
import DeleteNationalRegistrationError from '@usecases/errors/delete-national-registration-error';

const nationalRegistrationRepositoryMock: MockProxy<NationalRegistrationRepository> & NationalRegistrationRepository =
  mock<NationalRegistrationRepository>();

const requestValidatorMock:
  MockProxy<RequestValidator<DeleteNationalRegistrationRequest>>
  & RequestValidator<DeleteNationalRegistrationRequest> = mock<RequestValidator<DeleteNationalRegistrationRequest>>();

const makeDeleteNationalRegistrationUseCase = () => new DeleteNationalRegistrationUseCase(
  requestValidatorMock,
  nationalRegistrationRepositoryMock,
);

describe('V1 Delete NationalRegistration Use Case', () => {
  beforeEach(() => {
    mockReset(nationalRegistrationRepositoryMock);
    mockReset(requestValidatorMock);
  });

  test('Should throw if invalid request when the id parameter is null', async () => {
    const useCase = makeDeleteNationalRegistrationUseCase();
    const request: DeleteNationalRegistrationRequest = {
      id: null,
    };
    const resultValidator: ResultValidator<DeleteNationalRegistrationRequest> = {
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
    const useCase = makeDeleteNationalRegistrationUseCase();
    const request: DeleteNationalRegistrationRequest = {
      id: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<DeleteNationalRegistrationRequest> = {
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
    const useCase = makeDeleteNationalRegistrationUseCase();
    const request: DeleteNationalRegistrationRequest = {
      id: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<DeleteNationalRegistrationRequest> = {
      isValid: true,
      value: request,
    };
    const error = new Error('Any Error.');

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findById.mockRejectedValue(error);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.isRight()).toBe(false);
    expect(response.value).toEqual(new DeleteNationalRegistrationError(error));
  });

  test('Should return response when use case success', async () => {
    const useCase = makeDeleteNationalRegistrationUseCase();
    const request: DeleteNationalRegistrationRequest = {
      id: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<DeleteNationalRegistrationRequest> = {
      isValid: true,
      value: request,
    };

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findById.mockResolvedValue({
      id: request.id,
      number: faker.datatype.string(),
    });
    nationalRegistrationRepositoryMock.delete.mockResolvedValue();

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(false);
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual(null);
  });
});
