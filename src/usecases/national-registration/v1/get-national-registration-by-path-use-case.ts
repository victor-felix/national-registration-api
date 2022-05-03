import GetNationalRegistrationByPathError from "@usecases/errors/get-national-registration-by-path-error";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import NationalRegistrationNotFoundError from "@usecases/errors/national-registration-not-found-error";
import { left, right } from "@usecases/helpers/either";
import RequestValidator from "@usecases/port/request-validator";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import { inject, injectable } from "tsyringe";
import GetNationalRegistrationByPathRequest from "./domain/get-national-registration-by-path-request";
import { GetNationalRegistrationByPathResponse } from "./domain/get-national-registration-by-path-response";
import NationalRegistrationRepository from "./port/national-registration-repository";

@injectable()
class GetNationalRegistrationByPathUseCase
  implements
    UseCase<
      RequestAndResponse<
        GetNationalRegistrationByPathRequest,
        GetNationalRegistrationByPathResponse
      >
    >
{
  private readonly requestValidator: RequestValidator<GetNationalRegistrationByPathRequest>;

  private readonly nationalRegistrationRepository: NationalRegistrationRepository;

  constructor(
    @inject('GetNationalRegistrationByPathRequestValidator') requestValidator:
      RequestValidator<GetNationalRegistrationByPathRequest>,
    @inject('NationalRegistrationRepository') nationalRegistrationRepository: NationalRegistrationRepository,
  ) {
    this.requestValidator = requestValidator;
    this.nationalRegistrationRepository = nationalRegistrationRepository;
  }

  async execute(request: GetNationalRegistrationByPathRequest): Promise<GetNationalRegistrationByPathResponse> {
    try {
      const resultValidator = this.requestValidator.validate(request);

      if (!resultValidator.isValid) {
        return left(new InvalidDataError(resultValidator.fields));
      }

      const nationalRegistrationExists = await this.nationalRegistrationRepository.findById(request.id);

      if (!nationalRegistrationExists) {
        return left(new NationalRegistrationNotFoundError());
      }

      return right(nationalRegistrationExists);
    } catch (error) {
      return left(new GetNationalRegistrationByPathError(error))
    }
  }
}

export default GetNationalRegistrationByPathUseCase;
