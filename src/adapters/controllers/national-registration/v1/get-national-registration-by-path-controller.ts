import Controller from "@adapters/controllers/port/controller";
import HttpRequest from "@adapters/controllers/port/http-request";
import HttpResponse from "@adapters/controllers/port/http-response";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationNotFoundError from "@usecases/errors/national-registration-not-found-error";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import GetNationalRegistrationByPathRequest
  from "@usecases/national-registration/v1/domain/get-national-registration-by-path-request";
import { GetNationalRegistrationByPathResponse }
  from "@usecases/national-registration/v1/domain/get-national-registration-by-path-response";
import { inject, injectable } from "tsyringe";

@injectable()
class GetNationalRegistrationByPathController extends Controller {
  private readonly useCase:
    UseCase<RequestAndResponse<GetNationalRegistrationByPathRequest, GetNationalRegistrationByPathResponse>>;

  constructor(
    @inject('GetNationalRegistrationByPathUseCase') useCase:
      UseCase<RequestAndResponse<GetNationalRegistrationByPathRequest, GetNationalRegistrationByPathResponse>>
  ) {
    super();
    this.useCase = useCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request: GetNationalRegistrationByPathRequest = {
        ...httpRequest.params,
      };
      const response = await this.useCase.execute(request);

      if (response.isLeft()) {
        if (response.value instanceof InvalidDataError) {
          return this.unprocessableEntity(response.value as InvalidDataError);
        }

        if (response.value instanceof NationalRegistrationNotFoundError) {
          return this.notFound(response.value as InvalidDataError);
        }
      }

      return this.ok(response.value);
    } catch (error) {
      return this.serverError('Internal error');
    }
  }
}

export default GetNationalRegistrationByPathController;
