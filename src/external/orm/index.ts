import { createConnection, ConnectionOptions } from 'typeorm';
import config from '@main/config';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: config.DB.host,
  port: config.DB.port,
  username: config.DB.username,
  password: config.DB.password,
  database: config.DB.database,
  synchronize: config.DB.synchronize,
  migrationsRun: config.DB.migrationsRun,
  logging: config.DB.logging,
  // ssl: true,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false
  //   }
  // },
  entities: [`${__dirname}/schemas/public/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
};

export default () => createConnection(connectionOptions);
