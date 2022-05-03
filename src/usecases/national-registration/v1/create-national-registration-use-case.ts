import NationalRegistration from "@entities/national-registration";
import CreateNationalRegistrationError from "@usecases/errors/create-national-registration-error";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationAlreadyExistsError from "@usecases/errors/national-registration-already-exists-error";
import { left, right } from "@usecases/helpers/either";
import RequestValidator from "@usecases/port/request-validator";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import NationalRegistrationRepository from "@usecases/national-registration/v1/port/national-registration-repository";
import { inject, injectable } from "tsyringe";
import CreateNationalRegistrationRequest from "./domain/create-national-registration-request";
import { CreateNationalRegistrationResponse } from "./domain/create-national-registration-response";

@injectable()
class CreateNationalRegistrationUseCase implements UseCase<
  RequestAndResponse<CreateNationalRegistrationRequest, CreateNationalRegistrationResponse>
> {
  private readonly requestValidator: RequestValidator<CreateNationalRegistrationRequest>;

  private readonly nationalRegistrationRepository: NationalRegistrationRepository;

  constructor(
    @inject('CreateNationalRegistrationRequestValidator')
      requestValidator: RequestValidator<CreateNationalRegistrationRequest>,
    @inject('NationalRegistrationRepository') nationalRegistrationRepository: NationalRegistrationRepository,
  ) {
    this.requestValidator = requestValidator;
    this.nationalRegistrationRepository = nationalRegistrationRepository;
    this.nationalRegistrationRepository = nationalRegistrationRepository;
  }

  async execute(request: CreateNationalRegistrationRequest): Promise<CreateNationalRegistrationResponse> {
    try {
      const resultValidator = this.requestValidator.validate(request);

      if (!resultValidator.isValid) {
        return left(new InvalidDataError(resultValidator.fields));
      }

      let nationalRegistrationExists: NationalRegistration = await this.nationalRegistrationRepository
        .findByNumber(request.number);

      if (nationalRegistrationExists) {
        return left(new NationalRegistrationAlreadyExistsError());
      }

      const createdNationalRegistration: NationalRegistration = await this.nationalRegistrationRepository.save(request);

      return right(createdNationalRegistration);
    } catch (error) {
      return left(new CreateNationalRegistrationError(error))
    }
  }
}

export default CreateNationalRegistrationUseCase;
