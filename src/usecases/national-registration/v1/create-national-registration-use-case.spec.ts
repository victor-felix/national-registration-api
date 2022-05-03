import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import NationalRegistrationRepository from './port/national-registration-repository';
import CreateNationalRegistrationRequest from './domain/create-national-registration-request';
import RequestValidator from '@usecases/port/request-validator';
import CreateNationalRegistrationUseCase from './create-national-registration-use-case';
import ResultValidator from '@usecases/port/result-validator';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import CreateNationalRegistrationError from '@usecases/errors/create-national-registration-error';
import NationalRegistration from '@entities/national-registration';
import NationalRegistrationAlreadyExistsError from '@usecases/errors/national-registration-already-exists-error';

const nationalRegistrationRepositoryMock: MockProxy<NationalRegistrationRepository> & NationalRegistrationRepository =
  mock<NationalRegistrationRepository>();

const requestValidatorMock:
  MockProxy<RequestValidator<CreateNationalRegistrationRequest>>
  & RequestValidator<CreateNationalRegistrationRequest> = mock<RequestValidator<CreateNationalRegistrationRequest>>();

const makeCreateNationalRegistrationUseCase = () => new CreateNationalRegistrationUseCase(
  requestValidatorMock,
  nationalRegistrationRepositoryMock,
);

describe('V1 Create NationalRegistration Use Case', () => {
  beforeEach(() => {
    mockReset(nationalRegistrationRepositoryMock);
    mockReset(nationalRegistrationRepositoryMock);
    mockReset(requestValidatorMock);
  })

  test('Should throw if invalid request when empty data', async () => {
    const useCase = makeCreateNationalRegistrationUseCase();
    const request: CreateNationalRegistrationRequest = {
      number: '',
    };
    const resultValidator: ResultValidator<CreateNationalRegistrationRequest> = {
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

  test('Should throw if nationalRegistration already exists', async () => {
    const useCase = makeCreateNationalRegistrationUseCase();
    const request: CreateNationalRegistrationRequest = {
      number: '11122233344',
    };
    const resultValidator: ResultValidator<CreateNationalRegistrationRequest> = {
      isValid: true,
      fields: { ...request },
    };

    requestValidatorMock.validate.mockReturnValue(resultValidator);
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

  test('Should throw error when use case fail', async () => {
    const useCase = makeCreateNationalRegistrationUseCase();
    const request: CreateNationalRegistrationRequest = {
      number: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<CreateNationalRegistrationRequest> = {
      isValid: true,
      value: request,
    };
    const error = new Error('Any Error.');

    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findByNumber.mockRejectedValue(error);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(true);
    expect(response.isRight()).toBe(false);
    expect(response.value).toEqual(new CreateNationalRegistrationError(error));
  });

  test('Should return response when nationalRegistration not exists and use case success', async () => {
    const useCase = makeCreateNationalRegistrationUseCase();
    const request: CreateNationalRegistrationRequest = {
      number: faker.datatype.string(),
    };
    const resultValidator: ResultValidator<CreateNationalRegistrationRequest> = {
      isValid: true,
      value: request,
    };
    const createdNationalRegistration: NationalRegistration = {
      id: faker.datatype.string(),
      number: request.number,
    };


    requestValidatorMock.validate.mockReturnValue(resultValidator);
    nationalRegistrationRepositoryMock.findByNumber.mockResolvedValue(undefined);
    nationalRegistrationRepositoryMock.save.mockResolvedValue(createdNationalRegistration);

    const response = await useCase.execute(request);

    expect(response.isLeft()).toBe(false);
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual(createdNationalRegistration);
  });
});
