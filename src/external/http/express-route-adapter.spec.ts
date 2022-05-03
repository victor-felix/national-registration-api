/* eslint-disable @typescript-eslint/no-useless-constructor */
import { getMockReq, getMockRes } from '@jest-mock/express';
import Controller from '@adapters/controllers/port/controller';
import HttpRequest from '@adapters/controllers/port/http-request';
import HttpResponse from '@adapters/controllers/port/http-response';
import adapterRoute from './express-route-adapter';

let httpResponse: HttpResponse;

class HandleController extends Controller {
  constructor() {
    super();
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(httpResponse);
  }
}

describe('Test express route adapter', () => {
  test('Should return response when call handle controller', async () => {
    const controller = new HandleController();
    const mockRequest = getMockReq({
      params: { id: 'id' },
      body: {
        name: 'name',
      },
      query: { id: 'id' },
      headers: { 'user-agent': 'user-agent' },
      ip: 'ip',
    });
    const { res } = getMockRes();
    httpResponse = {
      statusCode: 200,
      body: {
        id: 'id',
        name: 'name',
      },
    };

    const middleware = adapterRoute(controller);
    await middleware(mockRequest, res);

    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      id: 'id',
      name: 'name',
    });
  });
});
