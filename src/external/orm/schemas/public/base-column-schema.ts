import { EntitySchemaColumnOptions } from 'typeorm';

export const BaseColumnSchema = {
  createdAt: {
    name: 'created_at',
    type: 'timestamptz',
    createDate: true,
    nullable: false,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: 'timestamptz',
    updateDate: true,
    nullable: false,
  } as EntitySchemaColumnOptions,
};
