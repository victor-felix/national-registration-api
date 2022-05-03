import Joi from '@hapi/joi';
import HapiEntityValidator from "@external/validations/helpers/hapi-request-validator";
import RequestValidator from "@usecases/port/request-validator";
import ResultValidator from "@usecases/port/result-validator";
import GetNationalRegistrationByPathRequest
  from '@usecases/national-registration/v1/domain/get-national-registration-by-path-request';

class GetNationalRegistrationByPathRequestValidator
extends HapiEntityValidator<GetNationalRegistrationByPathRequest>
implements RequestValidator<GetNationalRegistrationByPathRequest> {
  constructor() {

    const requestSchema = Joi.object<GetNationalRegistrationByPathRequest>({
      id: Joi.string().length(36).required(),
    });

    super(requestSchema);
  }

  public validate(request: GetNationalRegistrationByPathRequest)
    : ResultValidator<GetNationalRegistrationByPathRequest> {
    return super.validate(request);
  }
}

export default GetNationalRegistrationByPathRequestValidator
