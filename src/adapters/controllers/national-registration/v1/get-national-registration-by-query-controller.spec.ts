import 'reflect-metadata';
import faker from 'faker';
import { mock, MockProxy, mockReset } from 'jest-mock-extended';
import UseCase, { RequestAndResponse } from '@usecases/port/use-case';
import HttpRequest from '@adapters/controllers/port/http-request';
import InvalidDataError from '@usecases/errors/invalid-data-error';
import GetNationalRegistrationByQueryController from './get-national-registration-by-query-controller';
import GetNationalRegistrationByQueryRequest
  from '@usecases/national-registration/v1/domain/get-national-registration-by-query-request';
import { GetNationalRegistrationByQueryResponse }
  from '@usecases/national-registration/v1/domain/get-national-registration-by-query-response';
import NationalRegistrationPaginationResponse
  from '@usecases/national-registration/v1/domain/national-registration-pagination-response';

const useCaseMock: MockProxy<
  UseCase<
    RequestAndResponse<
      GetNationalRegistrationByQueryRequest,
      GetNationalRegistrationByQueryResponse
    >
  >
> &
  UseCase<
    RequestAndResponse<
      GetNationalRegistrationByQueryRequest,
      GetNationalRegistrationByQueryResponse
    >
  > =
  mock<
    UseCase<
      RequestAndResponse<
        GetNationalRegistrationByQueryRequest,
        GetNationalRegistrationByQueryResponse
      >
    >
  >();

const makeGetNationalRegistrationByQueryController = () =>
  new GetNationalRegistrationByQueryController(useCaseMock);

describe('V1 Get NationalRegistration By Query Controller', () => {
  beforeEach(() => {
    mockReset(useCaseMock);
  });

  test('Should response 422 if invalid body when handle controller', async () => {
    const controller = makeGetNationalRegistrationByQueryController();
    const fields = {
      id: 'id é obrigatório',
    };
    const request: HttpRequest = {
      query: {
        id: '',
      },
    };
    const error: InvalidDataError = new InvalidDataError(fields);
    const response: GetNationalRegistrationByQueryResponse = {
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

  test('Should response 200 if UseCase success when handle controller', async () => {
    const controller = makeGetNationalRegistrationByQueryController();
    const request: HttpRequest = {
      query: {
        id: 'id',
      },
    };
    const nationalRegistrations: NationalRegistrationPaginationResponse = {
      data: [
        {
          id: faker.datatype.string(),
          number: faker.datatype.string(),
        }
      ],
      page_total: faker.datatype.number(),
      total: faker.datatype.number(),
      next: faker.datatype.number(),
      previous: faker.datatype.number(),
    };
    const response: GetNationalRegistrationByQueryResponse = {
      isLeft: jest.fn().mockReturnValue(false),
      isRight: jest.fn().mockReturnValue(true),
      value: nationalRegistrations,
    };

    useCaseMock.execute.mockResolvedValue(response);

    const httpResult = await controller.handle(request);

    expect(httpResult).not.toBeNull();
    expect(httpResult.statusCode).toEqual(200);
    expect(httpResult.body).toEqual(nationalRegistrations);
  });

  test('Should response 500 if UseCase throw error when handle controller', async () => {
    const controller = makeGetNationalRegistrationByQueryController();
    const request: HttpRequest = {
      body: { name: 'Test', nationalRegistration: { name: 'test' } },
    };
    const error: Error = new Error('Any Error');

    useCaseMock.execute.mockRejectedValue(error);

    const response = await controller.handle(request);

    expect(response).not.toBeNull();
    expect(response.statusCode).toEqual(500);
    expect(response.body).toEqual('Internal error');
  });
});
