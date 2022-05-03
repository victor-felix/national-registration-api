import { EntitySchema } from 'typeorm';
import { BaseColumnSchema } from './base-column-schema';
import NationalRegistration from '@entities/national-registration';

export const NationalRegistrationEntity = new EntitySchema<NationalRegistration>({
  name: 'national_registration',
  columns: {
    id: {
      type: 'uuid',
      name: 'id',
      primary: true,
      generated: 'uuid',
      nullable: false,
    },
    number: {
      type: 'varchar',
      name: 'number',
      nullable: false,
      length: 14,
      unique: true,
    },
    blocked: {
      type: 'boolean',
      name: 'blocked',
      nullable: false,
      default: false,
    },
    ...BaseColumnSchema,
  },
});
