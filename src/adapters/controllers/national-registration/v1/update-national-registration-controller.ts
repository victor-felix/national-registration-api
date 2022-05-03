import Controller from "@adapters/controllers/port/controller";
import HttpRequest from "@adapters/controllers/port/http-request";
import HttpResponse from "@adapters/controllers/port/http-response";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationNotFoundError from "@usecases/errors/national-registration-not-found-error";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import UpdateNationalRegistrationRequest
  from "@usecases/national-registration/v1/domain/update-national-registration-request";
import { UpdateNationalRegistrationResponse }
  from "@usecases/national-registration/v1/domain/update-national-registration-response";
import { inject, injectable } from "tsyringe";
import UpdateNationalRegistrationError from "@usecases/errors/update-national-registration-error";
import NationalRegistrationAlreadyExistsError from "@usecases/errors/national-registration-already-exists-error";

@injectable()
class UpdateNationalRegistrationController extends Controller {
  private readonly useCase:
    UseCase<RequestAndResponse<UpdateNationalRegistrationRequest, UpdateNationalRegistrationResponse>>;

  constructor(
    @inject('UpdateNationalRegistrationUseCase') useCase:
      UseCase<RequestAndResponse<UpdateNationalRegistrationRequest, UpdateNationalRegistrationResponse>>
  ) {
    super();
    this.useCase = useCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {

      const request: UpdateNationalRegistrationRequest = {
        id: httpRequest.params.id,
        ...httpRequest.body,
      };

      const response = await this.useCase.execute(request);

      if (response.isLeft()) {
        if (response.value instanceof InvalidDataError) {
          return this.unprocessableEntity(response.value as InvalidDataError);
        }

        if (response.value instanceof NationalRegistrationNotFoundError) {
          return this.badRequest(response.value as NationalRegistrationNotFoundError);
        }

        if (response.value instanceof UpdateNationalRegistrationError) {
          return this.badRequest(response.value as UpdateNationalRegistrationError);
        }

        if (response.value instanceof NationalRegistrationAlreadyExistsError) {
          return this.badRequest(response.value as NationalRegistrationAlreadyExistsError);
        }
      }

      return this.ok(response.value);
    } catch (error) {
      return this.serverError('Internal error');
    }
  }
}

export default UpdateNationalRegistrationController;
