import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import NationalRegistrationRepository from './port/national-registration-repository';
import RequestValidator from '@usecases/port/request-validator';
import ResultValidator from '@usecases/port/result-validator';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import UpdateNationalRegistrationRequest from './domain/update-national-registration-request';
import UpdateNationalRegistrationUseCase from './update-national-registration-use-case';
import NationalRegistration from '@entities/national-registration';
import NationalRegistrationNotFoundError from '@usecases/errors/national-registration-not-found-error';
import UpdateNationalRegistrationError from '@usecases/errors/update-national-registration-error';
import NationalRegistrationAlreadyExistsError from '@usecases/errors/national-registration-already-exists-error';

const nationalRegistrationRepositoryMock: MockProxy<NationalRegistrationRepository> & NationalRegistrationRepository =
  mock<NationalRegistrationRepository>();

const requestValidatorMock:
  MockProxy<RequestValidator<UpdateNationalRegistrationRequest>>
  & RequestValidator<UpdateNationalRegistrationRequest> = mock<RequestValidator<UpdateNationalRegistrationRequest>>();

const makeUpdateNationalRegistrationUseCase = () => new UpdateNationalRegistrationUseCase(
  requestValidatorMock,
  nationalRegistrationRepositoryMock,
);

describe('V1 Update NationalRegistration Use Case', () => {
  beforeEach(() => {
    mockReset(nationalRegistrationRepositoryMock);
    mockReset(requestValidatorMock);
  });

  test('Should throw if invalid request when the id parameter is null', async () => {
    const useCase = makeUpdateNationalRegistrationUseCase();
    const request: UpdateNationalRegistrationRequest = {
      id: null,
      number: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<UpdateNationalRegistrationRequest> = {
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
    const useCase = makeUpdateNationalRegistrationUseCase();
    const request: UpdateNationalRegistrationRequest = {
      id: faker.datatype.string(),
      number: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<UpdateNationalRegistrationRequest> = {
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
    const useCase = makeUpdateNationalRegistrationUseCase();
    const request: UpdateNationalRegistrationRequest = {
      id: faker.datatype.string(),
      number: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<UpdateNationalRegistrationRequest> = {
      isValid: true,
      value: request,
    };
    const error = new Error('Any Error.');

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findById.mockRejectedValue(error);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.isRight()).toBe(false);
    expect(response.value).toEqual(new UpdateNationalRegistrationError(error));
  });

  test('Should throw if nationalRegistration already exists', async () => {
    const useCase = makeUpdateNationalRegistrationUseCase();
    const request: UpdateNationalRegistrationRequest = {
      id: faker.datatype.uuid(),
      number: '11122233344',
    };
    const resultValidator: ResultValidator<UpdateNationalRegistrationRequest> = {
      isValid: true,
      fields: { ...request },
    };

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findById.mockResolvedValue({
      id: request.id,
      number: faker.datatype.string(),
      blocked: false,
    });
    nationalRegistrationRepositoryMock.findByNumber.mockResolvedValue({
      id: faker.datatype.string(),
      number: faker.datatype.string(),
    });

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.isRight()).toBe(false);
    expect(response.value).toEqual(
      new NationalRegistrationAlreadyExistsError(),
    );
  });

  test('Should return response when nationalRegistration not exists and use case success', async () => {
    const useCase = makeUpdateNationalRegistrationUseCase();
    const request: UpdateNationalRegistrationRequest = {
      id: faker.datatype.string(),
      number: faker.datatype.string(),
      blocked: true,
    };
    const resultValidator: ResultValidator<UpdateNationalRegistrationRequest> = {
      isValid: true,
      value: request,
    };
    const createdNationalRegistration: NationalRegistration = {
      id: request.id,
      number: faker.datatype.string(),
    };
    const updatedNationalRegistration: NationalRegistration = {
      id: request.id,
      number: request.number,
    };

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findById.mockResolvedValue({
      id: faker.datatype.string(),
      number: faker.datatype.string(),
    });
    nationalRegistrationRepositoryMock.findByNumber.mockResolvedValue(undefined);
    nationalRegistrationRepositoryMock.save.mockResolvedValue(createdNationalRegistration);
    nationalRegistrationRepositoryMock.save.mockResolvedValue(updatedNationalRegistration);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(false);
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual(updatedNationalRegistration);
  });
});
