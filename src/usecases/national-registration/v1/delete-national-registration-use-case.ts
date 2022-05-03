import DeleteNationalRegistrationError from "@usecases/errors/delete-national-registration-error";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationNotFoundError from "@usecases/errors/national-registration-not-found-error";
import { left, right } from "@usecases/helpers/either";
import RequestValidator from "@usecases/port/request-validator";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import { inject, injectable } from "tsyringe";
import DeleteNationalRegistrationRequest from "./domain/delete-national-registration-request";
import { DeleteNationalRegistrationResponse } from "./domain/delete-national-registration-response";
import NationalRegistrationRepository from "./port/national-registration-repository";

@injectable()
class DeleteNationalRegistrationUseCase implements
  UseCase<RequestAndResponse<DeleteNationalRegistrationRequest, DeleteNationalRegistrationResponse>> {
  private readonly requestValidator: RequestValidator<DeleteNationalRegistrationRequest>;

  private readonly nationalRegistrationRepository: NationalRegistrationRepository;

  constructor(
    @inject('DeleteNationalRegistrationRequestValidator') requestValidator:
      RequestValidator<DeleteNationalRegistrationRequest>,
    @inject('NationalRegistrationRepository') nationalRegistrationRepository: NationalRegistrationRepository,
  ) {
    this.requestValidator = requestValidator;
    this.nationalRegistrationRepository = nationalRegistrationRepository;
  }

  async execute(request: DeleteNationalRegistrationRequest): Promise<DeleteNationalRegistrationResponse> {
    try {
      const resultValidator = this.requestValidator.validate(request);

      if (!resultValidator.isValid) {
        return left(new InvalidDataError(resultValidator.fields));
      }

      const nationalRegistrationExists = await this.nationalRegistrationRepository.findById(request.id);

      if (!nationalRegistrationExists) {
        return left(new NationalRegistrationNotFoundError())
      }

      await this.nationalRegistrationRepository.delete(request.id);

      return right(null);
    } catch (error) {
      return left(new DeleteNationalRegistrationError(error))
    }
  }
}

export default DeleteNationalRegistrationUseCase;
