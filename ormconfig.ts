import env from 'dotenv';
import path from 'path';

env.config({
  path: path.join(
    __dirname,
    process.env.NODE_ENV ? `./env/.env.${process.env.NODE_ENV}` : '',
  ),
});

export default {
  type: process.env.DATABASE_TYPE || 'mysql',
  host: process.env.DATABASE_URL,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  logging: process.env.DATABASE_LOGGING === 'true',
  entities: ['src/external/orm/schemas/public/*.ts'],
  migrations: ['src/external/orm/migrations/*.ts'],
  // ssl: true,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // },
  cli: {
    entitiesDir: 'src/external/orm/schemas',
    migrationsDir: 'src/external/orm/migrations',
  },
};
