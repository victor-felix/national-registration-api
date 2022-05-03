import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationNotFoundError from "@usecases/errors/national-registration-not-found-error";
import UpdateNationalRegistrationError from "@usecases/errors/update-national-registration-error";
import { left, right } from "@usecases/helpers/either";
import RequestValidator from "@usecases/port/request-validator";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import NationalRegistrationRepository from "@usecases/national-registration/v1/port/national-registration-repository";
import { inject, injectable } from "tsyringe";
import UpdateNationalRegistrationRequest from "./domain/update-national-registration-request";
import { UpdateNationalRegistrationResponse } from "./domain/update-national-registration-response";
import NationalRegistration from "@entities/national-registration";
import NationalRegistrationAlreadyExistsError from "@usecases/errors/national-registration-already-exists-error";

@injectable()
class UpdateNationalRegistrationUseCase implements UseCase<
  RequestAndResponse<UpdateNationalRegistrationRequest, UpdateNationalRegistrationResponse>
> {
  private readonly requestValidator: RequestValidator<UpdateNationalRegistrationRequest>;

  private readonly nationalRegistrationRepository: NationalRegistrationRepository;

  constructor(
    @inject('UpdateNationalRegistrationRequestValidator') requestValidator:
      RequestValidator<UpdateNationalRegistrationRequest>,
    @inject('NationalRegistrationRepository') nationalRegistrationRepository: NationalRegistrationRepository,
  ) {
    this.requestValidator = requestValidator;
    this.nationalRegistrationRepository = nationalRegistrationRepository;
    this.nationalRegistrationRepository = nationalRegistrationRepository;
  }

  async execute(request: UpdateNationalRegistrationRequest): Promise<UpdateNationalRegistrationResponse> {
    try {
      const resultValidator = this.requestValidator.validate(request);

      if (!resultValidator.isValid) {
        return left(new InvalidDataError(resultValidator.fields));
      }

      const nationalRegistrationExists = await this.nationalRegistrationRepository.findById(request.id);

      if (!nationalRegistrationExists) {
        return left(new NationalRegistrationNotFoundError())
      }

      if (nationalRegistrationExists.number !== request.number) {
        let newNationalRegistrationExists: NationalRegistration = await this.nationalRegistrationRepository
          .findByNumber(request.number);

        if (newNationalRegistrationExists) {
          return left(new NationalRegistrationAlreadyExistsError());
        }
      }

      nationalRegistrationExists.number = request.number;

      if (request.blocked) {
        nationalRegistrationExists.blocked = request.blocked;
      }

      const updatedNationalRegistration = await this.nationalRegistrationRepository.save(nationalRegistrationExists);

      return right(updatedNationalRegistration);
    } catch (error) {
      return left(new UpdateNationalRegistrationError(error))
    }
  }
}

export default UpdateNationalRegistrationUseCase;
