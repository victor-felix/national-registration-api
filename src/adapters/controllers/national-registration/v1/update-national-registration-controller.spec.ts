import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import UseCase, { RequestAndResponse } from '@usecases/port/use-case';
import HttpRequest from '@adapters/controllers/port/http-request';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import UpdateNationalRegistrationController from './update-national-registration-controller';
import UpdateNationalRegistrationRequest
  from '@usecases/national-registration/v1/domain/update-national-registration-request';
import { UpdateNationalRegistrationResponse }
  from '@usecases/national-registration/v1/domain/update-national-registration-response';
import NationalRegistrationNotFoundError from '@usecases/errors/national-registration-not-found-error';
import NationalRegistrationResponse from '@usecases/national-registration/v1/domain/national-registration-response';
import UpdateNationalRegistrationError from '@usecases/errors/update-national-registration-error';
import NationalRegistrationAlreadyExistsError from '@usecases/errors/national-registration-already-exists-error';

const useCaseMock: MockProxy<
  UseCase<
    RequestAndResponse<
      UpdateNationalRegistrationRequest,
      UpdateNationalRegistrationResponse
    >
  >
> &
  UseCase<
    RequestAndResponse<
      UpdateNationalRegistrationRequest,
      UpdateNationalRegistrationResponse
    >
  > =
  mock<
    UseCase<
      RequestAndResponse<
        UpdateNationalRegistrationRequest,
        UpdateNationalRegistrationResponse
      >
    >
  >();

const makeUpdateNationalRegistrationController = () =>
  new UpdateNationalRegistrationController(useCaseMock);

describe('V1 Get NationalRegistration By Query Controller', () => {
  beforeEach(() => {
    mockReset(useCaseMock);
  });

  test('Should response 422 if invalid body when handle controller', async () => {
    const controller = makeUpdateNationalRegistrationController();
    const fields = {
      id: 'id is required',
    };
    const request: HttpRequest = {
      params: {},
    };
    const error: InvalidDataError = new InvalidDataError(fields);
    const response: UpdateNationalRegistrationResponse
     = {
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

  test('Should response 400 if UseCase fail NationalRegistrationNotFoundError when handle controller', async () => {
    const controller = makeUpdateNationalRegistrationController();
    const request: HttpRequest = {
      params: { id: 1, },
    };
    const error: NationalRegistrationNotFoundError = new NationalRegistrationNotFoundError();
    const response: UpdateNationalRegistrationResponse = {
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

  test('Should response 400 if UseCase fail UpdateNationalRegistrationError when handle controller', async () => {
    const controller = makeUpdateNationalRegistrationController();
    const request: HttpRequest = {
      params: { id: 1, },
      body: { number: 'Test' },
    };
    const error: UpdateNationalRegistrationError = new UpdateNationalRegistrationError(
      new Error('Any Error'),
    );
    const response: UpdateNationalRegistrationResponse = {
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
    const controller = makeUpdateNationalRegistrationController();
    const request: HttpRequest = {
      params: { id: 1, },
      body: { number: 'Test' },
    };
    const error: NationalRegistrationAlreadyExistsError = new NationalRegistrationAlreadyExistsError();
    const response: UpdateNationalRegistrationResponse = {
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
    const controller = makeUpdateNationalRegistrationController();
    const request: HttpRequest = {
      params: { id: 1, },
      body: { number: 'test' },
    };

    const updateNationalRegistrationResponse: NationalRegistrationResponse = {
      id: faker.datatype.string(),
      number: 'test',
    };

    const response: UpdateNationalRegistrationResponse = {
      isLeft: jest.fn().mockReturnValue(false),
      isRight: jest.fn().mockReturnValue(true),
      value: updateNationalRegistrationResponse,
    };

    useCaseMock.execute.mockResolvedValue(response);

    const httpResult = await controller.handle(request);

    expect(httpResult).not.toBeNull();
    expect(httpResult.statusCode).toEqual(200);
    expect(httpResult.body).toEqual(updateNationalRegistrationResponse);
  });

  test('Should response 500 if UseCase throw error when handle controller', async () => {
    const controller = makeUpdateNationalRegistrationController();
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
