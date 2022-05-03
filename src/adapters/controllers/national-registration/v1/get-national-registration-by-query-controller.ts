import Controller from "@adapters/controllers/port/controller";
import HttpRequest from "@adapters/controllers/port/http-request";
import HttpResponse from "@adapters/controllers/port/http-response";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import GetNationalRegistrationByQueryRequest
  from "@usecases/national-registration/v1/domain/get-national-registration-by-query-request";
import { GetNationalRegistrationByQueryResponse }
  from "@usecases/national-registration/v1/domain/get-national-registration-by-query-response";
import { inject, injectable } from "tsyringe";

@injectable()
class GetNationalRegistrationByQueryController extends Controller {
  private readonly useCase:
    UseCase<RequestAndResponse<GetNationalRegistrationByQueryRequest, GetNationalRegistrationByQueryResponse>>;

  constructor(
    @inject('GetNationalRegistrationByQueryUseCase') useCase:
      UseCase<RequestAndResponse<GetNationalRegistrationByQueryRequest, GetNationalRegistrationByQueryResponse>>
  ) {
    super();
    this.useCase = useCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request: GetNationalRegistrationByQueryRequest = {
        ...httpRequest.query,
      };

      const response = await this.useCase.execute(
        {
          ...request,
          skip: request.skip || 1,
          take: request.take || 10
        }
      );

      if (response.isLeft() && response.value instanceof InvalidDataError) {
        return this.unprocessableEntity(response.value as InvalidDataError);
      }

      return this.ok(response.value);
    } catch (error) {
      return this.serverError('Internal error');
    }
  }
}

export default GetNationalRegistrationByQueryController;
