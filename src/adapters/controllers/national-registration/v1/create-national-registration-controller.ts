import Controller from "@adapters/controllers/port/controller";
import HttpRequest from "@adapters/controllers/port/http-request";
import HttpResponse from "@adapters/controllers/port/http-response";
import CreateNationalRegistrationError from "@usecases/errors/create-national-registration-error";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationAlreadyExistsError from "@usecases/errors/national-registration-already-exists-error";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import CreateNationalRegistrationRequest
  from "@usecases/national-registration/v1/domain/create-national-registration-request";
import { CreateNationalRegistrationResponse }
  from "@usecases/national-registration/v1/domain/create-national-registration-response";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateNationalRegistrationController extends Controller {
  private readonly useCase:
    UseCase<RequestAndResponse<CreateNationalRegistrationRequest, CreateNationalRegistrationResponse>>;

  constructor(
    @inject('CreateNationalRegistrationUseCase') useCase:
      UseCase<RequestAndResponse<CreateNationalRegistrationRequest, CreateNationalRegistrationResponse>>
  ) {
    super();
    this.useCase = useCase;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request: CreateNationalRegistrationRequest = {
        ...httpRequest.body,
      };

      const response = await this.useCase.execute(request);

      if (response.isLeft()) {
        if (response.value instanceof InvalidDataError) {
          return this.unprocessableEntity(response.value as InvalidDataError);
        }

        if (response.value instanceof CreateNationalRegistrationError) {
          return this.badRequest(response.value as CreateNationalRegistrationError);
        }

        if (response.value instanceof NationalRegistrationAlreadyExistsError) {
          return this.badRequest(response.value as NationalRegistrationAlreadyExistsError);
        }
      }

      return this.okCreated(response.value);
    } catch (error) {
      return this.serverError('Internal error');
    }
  }
}

export default CreateNationalRegistrationController;
