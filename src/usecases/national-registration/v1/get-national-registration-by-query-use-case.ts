import NationalRegistration from "@entities/national-registration";
import GetNationalRegistrationByQueryError from "@usecases/errors/get-national-registration-by-query-error";
import InvalidDataError from "@usecases/errors/invalid-data-error";
import { left, right } from "@usecases/helpers/either";
import RequestValidator from "@usecases/port/request-validator";
import UseCase, { RequestAndResponse } from "@usecases/port/use-case";
import { inject, injectable } from "tsyringe";
import GetNationalRegistrationByQueryRequest from "./domain/get-national-registration-by-query-request";
import { GetNationalRegistrationByQueryResponse } from "./domain/get-national-registration-by-query-response";
import NationalRegistrationRepository from "./port/national-registration-repository";

@injectable()
class GetNationalRegistrationByQueryUseCase
  implements
    UseCase<
      RequestAndResponse<
        GetNationalRegistrationByQueryRequest,
        GetNationalRegistrationByQueryResponse
      >
    >
{
  private readonly requestValidator: RequestValidator<GetNationalRegistrationByQueryRequest>;

  private readonly nationalRegistrationRepository: NationalRegistrationRepository;

  constructor(
    @inject('GetNationalRegistrationByQueryRequestValidator') requestValidator:
      RequestValidator<GetNationalRegistrationByQueryRequest>,
    @inject('NationalRegistrationRepository') nationalRegistrationRepository: NationalRegistrationRepository,
  ) {
    this.requestValidator = requestValidator;
    this.nationalRegistrationRepository = nationalRegistrationRepository;
  }

  async execute(request: GetNationalRegistrationByQueryRequest): Promise<GetNationalRegistrationByQueryResponse> {
    try {
      const resultValidator = this.requestValidator.validate(request);

      if (!resultValidator.isValid) {
        return left(new InvalidDataError(resultValidator.fields));
      }

      const nationalRegistrationQuery = {
        ...request
      } as NationalRegistration;

      const nationalRegistrations = await this.nationalRegistrationRepository.query(nationalRegistrationQuery);

      return right(nationalRegistrations);
    } catch (error) {
      return left(new GetNationalRegistrationByQueryError(error))
    }
  }
}

export default GetNationalRegistrationByQueryUseCase;
