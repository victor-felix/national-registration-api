/* eslint-disable @typescript-eslint/no-useless-constructor */
import InvalidDataError from '@usecases/errors/invalid-data-error';
import Controller from './controller';
import HttpRequest from './http-request';
import HttpResponse from './http-response';

class OKController extends Controller {
  constructor() {
    super();
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(this.ok({
      id: 'id',
      ...httpRequest.body,
    }));
  }
}

class BadRequestController extends Controller {
  constructor() {
    super();
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(this.badRequest(new Error('Any Error')));
  }
}

class UnprocessableEntityController extends Controller {
  constructor() {
    super();
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(this.unprocessableEntity(new InvalidDataError({ name: 'name is required' })));
  }
}

class ServerErrorController extends Controller {
  constructor() {
    super();
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(this.serverError('Any Error'));
  }
}

describe('Test controller', () => {
  test('Should return response OK when call ok in controller', async () => {
    const controller = new OKController();
    const httpRequest = {
      params: { id: 'id' },
      body: {
        name: 'name',
      },
      query: { id: 'id' },
    };

    const response = await controller.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 200,
      body: {
        id: 'id',
        ...httpRequest.body,
      },
    });
  });

  test('Should return response BadRequest when call badRequest in controller', async () => {
    const controller = new BadRequestController();
    const httpRequest = {
      params: { id: 'id' },
      body: {
        name: 'name',
      },
      query: { id: 'id' },
    };

    const response = await controller.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 400,
      body: 'Any Error',
    });
  });

  test('Should return response UnprocessableEntity when call unprocessableEntity in controller', async () => {
    const controller = new UnprocessableEntityController();
    const httpRequest = {
      params: { id: 'id' },
      body: {
        name: 'name',
      },
      query: { id: 'id' },
    };

    const response = await controller.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 422,
      body: { 'name': 'name is required' },
    });
  });

  test('Should return response ServerError when call serverError in controller', async () => {
    const controller = new ServerErrorController();
    const httpRequest = {
      params: { id: 'id' },
      body: {
        name: 'name',
      },
      query: { id: 'id' },
    };

    const response = await controller.handle(httpRequest);

    expect(response).toEqual({
      statusCode: 500,
      body: 'Any Error',
    });
  });
});
