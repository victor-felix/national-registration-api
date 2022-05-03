import InvalidDataError from '@usecases/errors/invalid-data-error';
import HttpRequest from './http-request';
import HttpResponse from './http-response';

abstract class Controller {
  abstract handle(httpRequest?: HttpRequest): Promise<HttpResponse>;

  protected ok(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: data,
    };
  }

  protected okCreated(data: any): HttpResponse {
    return {
      statusCode: 201,
      body: data,
    };
  }

  protected okNoContent(data: any): HttpResponse {
    return {
      statusCode: 204,
      body: data,
    };
  }

  protected badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error.message,
    };
  }

  protected notFound(error: Error): HttpResponse {
    return {
      statusCode: 404,
      body: error.message,
    };
  }

  protected unprocessableEntity(error: InvalidDataError): HttpResponse {
    return {
      statusCode: 422,
      body: { ...error.fields },
    };
  }

  protected serverError(reason: string): HttpResponse {
    return {
      statusCode: 500,
      body: reason,
    };
  }
}

export default Controller;
