import Joi from '@hapi/joi';
import HapiEntityValidator from "@external/validations/helpers/hapi-request-validator";
import RequestValidator from "@usecases/port/request-validator";
import ResultValidator from "@usecases/port/result-validator";
import GetNationalRegistrationByQueryRequest
  from '@usecases/national-registration/v1/domain/get-national-registration-by-query-request';

class GetNationalRegistrationByQueryRequestValidator
extends HapiEntityValidator<GetNationalRegistrationByQueryRequest>
implements RequestValidator<GetNationalRegistrationByQueryRequest> {
  constructor() {
    const requestSchema = Joi.object<GetNationalRegistrationByQueryRequest>({
      number: Joi.string().optional(),
      blocked: Joi.bool().optional(),
      skip: Joi.number().optional(),
      take: Joi.number().optional(),
    });

    super(requestSchema);
  }

  public validate(request: GetNationalRegistrationByQueryRequest):
    ResultValidator<GetNationalRegistrationByQueryRequest> {
    return super.validate(request);
  }
}

export default GetNationalRegistrationByQueryRequestValidator
