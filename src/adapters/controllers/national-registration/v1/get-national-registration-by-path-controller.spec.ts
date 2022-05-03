import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import UseCase, { RequestAndResponse } from '@usecases/port/use-case';
import HttpRequest from '@adapters/controllers/port/http-request';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import GetNationalRegistrationByPathController from './get-national-registration-by-path-controller';
import GetNationalRegistrationByPathRequest
  from '@usecases/national-registration/v1/domain/get-national-registration-by-path-request';
import { GetNationalRegistrationByPathResponse }
  from '@usecases/national-registration/v1/domain/get-national-registration-by-path-response';
import NationalRegistrationResponse from '@usecases/national-registration/v1/domain/national-registration-response';
import NationalRegistrationNotFoundError from '@usecases/errors/national-registration-not-found-error';

const useCaseMock: MockProxy<
  UseCase<
    RequestAndResponse<
      GetNationalRegistrationByPathRequest,
      GetNationalRegistrationByPathResponse
    >
  >
> &
  UseCase<
    RequestAndResponse<
      GetNationalRegistrationByPathRequest,
      GetNationalRegistrationByPathResponse
    >
  > =
  mock<
    UseCase<
      RequestAndResponse<
        GetNationalRegistrationByPathRequest,
        GetNationalRegistrationByPathResponse
      >
    >
  >();

const makeGetNationalRegistrationByPathController = () =>
  new GetNationalRegistrationByPathController(useCaseMock);

describe('V1 Get NationalRegistration By Path Controller', () => {
  beforeEach(() => {
    mockReset(useCaseMock);
  });

  test('Should response 422 if invalid body when handle controller', async () => {
    const controller = makeGetNationalRegistrationByPathController();
    const fields = {
      id: 'id is required',
    };
    const request: HttpRequest = {
      params: {},
    };
    const error: InvalidDataError = new InvalidDataError(fields);
    const response: GetNationalRegistrationByPathResponse = {
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

  test('Should response 404 if nationalRegistration not found', async () => {
    const controller = makeGetNationalRegistrationByPathController();
    const request: HttpRequest = {
      params: {},
    };
    const error: NationalRegistrationNotFoundError = new NationalRegistrationNotFoundError();
    const response: GetNationalRegistrationByPathResponse = {
      isLeft: jest.fn().mockReturnValue(true),
      isRight: jest.fn().mockReturnValue(false),
      value: error,
    };

    useCaseMock.execute.mockResolvedValue(response);

    const httpResult = await controller.handle(request);

    expect(httpResult).not.toBeNull();
    expect(httpResult.statusCode).toEqual(404);
    expect(httpResult.body).toEqual(error.message);
  });

  test('Should response 200 if UseCase success when handle controller', async () => {
    const controller = makeGetNationalRegistrationByPathController();
    const request: HttpRequest = {
      query: {
        id: 'id',
      },
    };
    const nationalRegistrationData: NationalRegistrationResponse = {
      id: faker.datatype.string(),
      number: faker.datatype.string(),
    };
    const response: GetNationalRegistrationByPathResponse = {
      isLeft: jest.fn().mockReturnValue(false),
      isRight: jest.fn().mockReturnValue(true),
      value: nationalRegistrationData,
    };

    useCaseMock.execute.mockResolvedValue(response);

    const httpResult = await controller.handle(request);

    expect(httpResult).not.toBeNull();
    expect(httpResult.statusCode).toEqual(200);
    expect(httpResult.body).toEqual(nationalRegistrationData);
  });

  test('Should response 500 if UseCase throw error when handle controller', async () => {
    const controller = makeGetNationalRegistrationByPathController();
    const request: HttpRequest = {
      params: { id: 1 },
    };
    const error: Error = new Error('Any Error');

    useCaseMock.execute.mockRejectedValue(error);

    const response = await controller.handle(request);

    expect(response).not.toBeNull();
    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual('Internal error');
  });
});
