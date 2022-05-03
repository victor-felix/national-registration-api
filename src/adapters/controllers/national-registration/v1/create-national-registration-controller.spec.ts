import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import UseCase, { RequestAndResponse } from '@usecases/port/use-case';
import HttpRequest from '@adapters/controllers/port/http-request';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import CreateNationalRegistrationRequest
  from '@usecases/national-registration/v1/domain/create-national-registration-request';
import { CreateNationalRegistrationResponse }
  from '@usecases/national-registration/v1/domain/create-national-registration-response';
import CreateNationalRegistrationController from './create-national-registration-controller';
import CreateNationalRegistrationError from '@usecases/errors/create-national-registration-error';
import NationalRegistrationResponse from '@usecases/national-registration/v1/domain/national-registration-response';
import NationalRegistrationAlreadyExistsError from '@usecases/errors/national-registration-already-exists-error';

const useCaseMock: MockProxy<
  UseCase<
    RequestAndResponse<
      CreateNationalRegistrationRequest,
      CreateNationalRegistrationResponse
    >
  >
> &
  UseCase<
    RequestAndResponse<
      CreateNationalRegistrationRequest,
      CreateNationalRegistrationResponse
    >
  > =
  mock<
    UseCase<
      RequestAndResponse<
        CreateNationalRegistrationRequest,
        CreateNationalRegistrationResponse
      >
    >
  >();

const makeCreateNationalRegistrationController = () =>
  new CreateNationalRegistrationController(useCaseMock);

describe('V1 Create NationalRegistration Controller', () => {
  beforeEach(() => {
    mockReset(useCaseMock);
  });

  test('Should response 422 if invalid body when handle controller', async () => {
    const controller = makeCreateNationalRegistrationController();
    const fields = {
      nationalRegistration: 'national registration is required',
    };
    const request: HttpRequest = {
      body: { name: 'Test' },
    };
    const error: InvalidDataError = new InvalidDataError(fields);
    const response: CreateNationalRegistrationResponse = {
      isLeft: jest.fn().mockReturnValue(true),
      isRight: jest.fn().mockReturnValue(false),
      value: error,
    };

    useCaseMock.execute.mockResolvedValue(response);

    const httpResult = await controller.handle(request);

    expect(httpResult).not.toBeNull();
    expect(httpResult.statusCode).toEqual(422);
    expect(httpResult.body).toEqual(fields);
  });

  test('Should response 400 if UseCase fail CreateNationalRegistrationError when handle controller', async () => {
    const controller = makeCreateNationalRegistrationController();
    const request: HttpRequest = {
      body: { name: 'Test' },
    };
    const error: CreateNationalRegistrationError = new CreateNationalRegistrationError(
      new Error('Any Error'),
    );
    const response: CreateNationalRegistrationResponse = {
      isLeft: jest.fn().mockReturnValue(true),
      isRight: jest.fn().mockReturnValue(false),
      value: error,
    };

    useCaseMock.execute.mockResolvedValue(response);

    const httpResult = await controller.handle(request);

    expect(httpResult).not.toBeNull();
    expect(httpResult.statusCode).toEqual(400);
    expect(httpResult.body).toEqual(error.message);
  });

  test(
    'Should response 400 if UseCase fail NationalRegistrationAlreadyExistsError when handle controller', async () => {
    const controller = makeCreateNationalRegistrationController();
    const request: HttpRequest = {
      body: { name: 'Test' },
    };
    const error: NationalRegistrationAlreadyExistsError = new NationalRegistrationAlreadyExistsError();
    const response: CreateNationalRegistrationResponse = {
      isLeft: jest.fn().mockReturnValue(true),
      isRight: jest.fn().mockReturnValue(false),
      value: error,
    };

    useCaseMock.execute.mockResolvedValue(response);

    const httpResult = await controller.handle(request);

    expect(httpResult).not.toBeNull();
    expect(httpResult.statusCode).toEqual(400);
    expect(httpResult.body).toEqual(error.message);
  });

  test('Should response 200 if UseCase success when handle controller', async () => {
    const controller = makeCreateNationalRegistrationController();
    const request: HttpRequest = {
      body: { name: 'Test', nationalRegistration: { name: 'test' } },
    };

    const createNationalRegistrationResponse: NationalRegistrationResponse = {
      id: faker.datatype.string(),
      number: 'test',
    };

    const response: CreateNationalRegistrationResponse = {
      isLeft: jest.fn().mockReturnValue(false),
      isRight: jest.fn().mockReturnValue(true),
      value: createNationalRegistrationResponse,
    };

    useCaseMock.execute.mockResolvedValue(response);

    const httpResult = await controller.handle(request);

    expect(httpResult).not.toBeNull();
    expect(httpResult.statusCode).toEqual(201);
    expect(httpResult.body).toEqual(createNationalRegistrationResponse);
  });

  test('Should response 500 if UseCase throw error when handle controller', async () => {
    const controller = makeCreateNationalRegistrationController();
    const request: HttpRequest = {
      body: { number: 'Test' },
    };
    const error: Error = new Error('Any Error');

    useCaseMock.execute.mockRejectedValue(error);

    const response = await controller.handle(request);

    expect(response).not.toBeNull();
    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual('Internal error');
  });
});
