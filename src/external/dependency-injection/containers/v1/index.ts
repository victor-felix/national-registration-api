import { containerV1 } from '..';

import CreateNationalRegistrationUseCase
  from '@usecases/national-registration/v1/create-national-registration-use-case';
import DeleteNationalRegistrationUseCase
  from '@usecases/national-registration/v1/delete-national-registration-use-case';
import GetNationalRegistrationByPathUseCase
  from '@usecases/national-registration/v1/get-national-registration-by-path-use-case';
import GetNationalRegistrationByQueryUseCase
  from '@usecases/national-registration/v1/get-national-registration-by-query-use-case';
import UpdateNationalRegistrationUseCase
  from '@usecases/national-registration/v1/update-national-registration-use-case';
import CreateNationalRegistrationRequestValidator
  from '@external/validations/national-registration/v1/create-national-registration-request-validator';
import DeleteNationalRegistrationRequestValidator
  from '@external/validations/national-registration/v1/delete-national-registration-request-validator';
import UpdateNationalRegistrationRequestValidator
  from '@external/validations/national-registration/v1/update-national-registration-request-validator';
import GetNationalRegistrationByPathRequestValidator
  from '@external/validations/national-registration/v1/get-national-registration-by-path-request-validator';
import GetNationalRegistrationByQueryRequestValidator
  from '@external/validations/national-registration/v1/get-national-registration-by-query-request-validator';
import CreateNationalRegistrationController
  from '@adapters/controllers/national-registration/v1/create-national-registration-controller';
import DeleteNationalRegistrationByPathController
  from '@adapters/controllers/national-registration/v1/delete-national-registration-by-path-controller';
import GetNationalRegistrationByPathController
  from '@adapters/controllers/national-registration/v1/get-national-registration-by-path-controller';
import GetNationalRegistrationByQueryController
  from '@adapters/controllers/national-registration/v1/get-national-registration-by-query-controller';
import UpdateNationalRegistrationController
  from '@adapters/controllers/national-registration/v1/update-national-registration-controller';

containerV1.register('CreateNationalRegistrationUseCase', {
  useClass: CreateNationalRegistrationUseCase,
});
containerV1.register('DeleteNationalRegistrationUseCase', {
  useClass: DeleteNationalRegistrationUseCase,
});
containerV1.register('GetNationalRegistrationByPathUseCase', {
  useClass: GetNationalRegistrationByPathUseCase,
});
containerV1.register('GetNationalRegistrationByQueryUseCase', {
  useClass: GetNationalRegistrationByQueryUseCase,
});
containerV1.register('UpdateNationalRegistrationUseCase', {
  useClass: UpdateNationalRegistrationUseCase,
});
containerV1.register('CreateNationalRegistrationRequestValidator', {
  useClass: CreateNationalRegistrationRequestValidator,
});
containerV1.register('DeleteNationalRegistrationRequestValidator', {
  useClass: DeleteNationalRegistrationRequestValidator,
});
containerV1.register('UpdateNationalRegistrationRequestValidator', {
  useClass: UpdateNationalRegistrationRequestValidator,
});
containerV1.register('GetNationalRegistrationByPathRequestValidator', {
  useClass: GetNationalRegistrationByPathRequestValidator,
});
containerV1.register('GetNationalRegistrationByQueryRequestValidator', {
  useClass: GetNationalRegistrationByQueryRequestValidator,
});

containerV1.register('CreateNationalRegistrationController', { useClass: CreateNationalRegistrationController });
containerV1.register(
  'DeleteNationalRegistrationByPathController',
  { useClass: DeleteNationalRegistrationByPathController }
);
containerV1.register('GetNationalRegistrationByPathController', { useClass: GetNationalRegistrationByPathController });
containerV1.register(
  'GetNationalRegistrationByQueryController',
  { useClass: GetNationalRegistrationByQueryController }
);
containerV1.register('UpdateNationalRegistrationController', { useClass: UpdateNationalRegistrationController });
