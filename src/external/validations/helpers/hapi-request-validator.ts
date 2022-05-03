import { ObjectSchema, ValidationOptions } from '@hapi/joi';
import RequestValidator from '@usecases/port/request-validator';
import ResultValidator from '@usecases/port/result-validator';

class HapiEntityValidator<TRequest> implements RequestValidator<TRequest> {
  private readonly bodySchema: ObjectSchema<any>;

  private readonly validationOptions: ValidationOptions;

  constructor(bodySchema: ObjectSchema<any>) {
    this.bodySchema = bodySchema;
    this.validationOptions = {
      abortEarly: false,
    };
  }

  public validate(request: TRequest): ResultValidator<TRequest> {
    const resultValidator = {} as ResultValidator<TRequest>;
    const { error, value } = this.bodySchema.validate(request, this.validationOptions);

    if (!error) {
      resultValidator.isValid = true;
      resultValidator.value = value;
      return resultValidator;
    }

    resultValidator.isValid = false;
    resultValidator.fields = error.details.reduce((field: any, detail: any) => {
      const key = detail.path.join('.');
      const message = detail.message.replace(/['"]/g, '');
      Object.assign(field, { [key]: message });
      return field;
    }, {});

    return resultValidator;
  }
}

export default HapiEntityValidator;