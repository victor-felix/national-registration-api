import Joi from '@hapi/joi';
import HapiEntityValidator from "@external/validations/helpers/hapi-request-validator";
import RequestValidator from "@usecases/port/request-validator";
import ResultValidator from "@usecases/port/result-validator";
import DeleteNationalRegistrationRequest
  from '@usecases/national-registration/v1/domain/delete-national-registration-request';

class DeleteNationalRegistrationRequestValidator
extends HapiEntityValidator<DeleteNationalRegistrationRequest>
implements RequestValidator<DeleteNationalRegistrationRequest> {
  constructor() {

    const requestSchema = Joi.object<DeleteNationalRegistrationRequest>({
      id: Joi.string().length(36).required(),
    });

    super(requestSchema);
  }

  public validate(request: DeleteNationalRegistrationRequest): ResultValidator<DeleteNationalRegistrationRequest> {
    return super.validate(request);
  }
}

export default DeleteNationalRegistrationRequestValidator
