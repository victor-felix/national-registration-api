import { cpf, cnpj } from 'cpf-cnpj-validator';
import Joi, { CustomHelpers } from '@hapi/joi';
import HapiEntityValidator from "@external/validations/helpers/hapi-request-validator";
import RequestValidator from "@usecases/port/request-validator";
import ResultValidator from "@usecases/port/result-validator";
import UpdateNationalRegistrationRequest
  from '@usecases/national-registration/v1/domain/update-national-registration-request';

class UpdateNationalRegistrationRequestValidator
extends HapiEntityValidator<UpdateNationalRegistrationRequest>
implements RequestValidator<UpdateNationalRegistrationRequest> {
  constructor() {
    const cpfValidate = (value: any, helpers: CustomHelpers) => {
      if (value.length === 11 && !cpf.isValid(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    };

    const cnpjValidate = (value: any, helpers: CustomHelpers) => {
      if (value.length > 11 && (value.length !== 14 || !cnpj.isValid(value))) {
        return helpers.error('any.invalid');
      }
      return value;
    };

    const requestSchema = Joi.object<UpdateNationalRegistrationRequest>({
      id: Joi.string().required(),
      number: Joi.string().min(11).max(14).custom(cpfValidate).custom(cnpjValidate).required(),
      blocked: Joi.bool().optional(),
    });

    super(requestSchema);
  }

  public validate(request: UpdateNationalRegistrationRequest): ResultValidator<UpdateNationalRegistrationRequest> {
    return super.validate(request);
  }
}

export default UpdateNationalRegistrationRequestValidator
