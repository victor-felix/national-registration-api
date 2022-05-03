import Controller from "@adapters/controllers/port/controller";
import HttpRequest from "@adapters/controllers/port/http-request";
import HttpResponse from "@adapters/controllers/port/http-response";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import DeleteNationalRegistrationRequest
  from "@usecases/national-registration/v1/domain/delete-national-registration-request";
import { DeleteNationalRegistrationResponse }
  from "@usecases/national-registration/v1/domain/delete-national-registration-response";
import { inject, injectable } from "tsyringe";

@injectable()
class DeleteNationalRegistrationByPathController extends Controller {
  private readonly useCase:
    UseCase<RequestAndResponse<DeleteNationalRegistrationRequest, DeleteNationalRegistrationResponse>>;

  constructor(
    @inject('DeleteNationalRegistrationUseCase') useCase:
      UseCase<RequestAndResponse<DeleteNationalRegistrationRequest, DeleteNationalRegistrationResponse>>
  ) {
    super();
    this.useCase = useCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request: DeleteNationalRegistrationRequest = {
        ...httpRequest.params,
      };

      const response = await this.useCase.execute(request);

      if (response.isLeft() && response.value instanceof InvalidDataError) {
        return this.unprocessableEntity(response.value as InvalidDataError);
      }

      return this.okNoContent(response.value);
    } catch (error) {
      return this.serverError('Internal error');
    }
  }
}

export default DeleteNationalRegistrationByPathController;
