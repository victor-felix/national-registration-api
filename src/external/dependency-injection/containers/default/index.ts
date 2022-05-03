import { container } from '..';

import TypeORMNationalRegistrationRepository
  from '@external/orm/repositories/type-orm-national-registration-repository';

container.register('NationalRegistrationRepository', {
  useClass: TypeORMNationalRegistrationRepository,
});
