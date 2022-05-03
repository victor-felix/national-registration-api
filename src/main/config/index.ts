import path from 'path';
import env from 'dotenv';

env.config({
  path: path.join(__dirname, `../../../env/.env.${process.env.NODE_ENV}`),
});
process.env.ENVIRONMENT = process.env.ENVIRONMENT || process.env.NODE_ENV;

export default {
  TEST: process.env.ENVIRONMENT === 'test',
  DEV: process.env.ENVIRONMENT === 'dev',
  PROD: process.env.ENVIRONMENT === 'prod',
  DB: {
    host: process.env.DATABASE_URL,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: false,
    migrationsRun: false,
    logging: process.env.DATABASE_LOGGING === 'true',
  },
  SERVERS: {
    http: {
      hostname: process.env.HTTP_HOST || 'localhost',
      port: Number(process.env.HTTP_PORT as string) || 3000,
    },
  },
};
