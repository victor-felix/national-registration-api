import express, { Express } from 'express';

import '@external/dependency-injection';
import setupProvider from './providers';
import setupMiddlewares from './middlewares';
import setupHealthCheck from './health-check';
import setupRoutes from './routes';

export default async (): Promise<Express> => {
  const app = express();
  await setupProvider();
  setupMiddlewares(app);
  setupHealthCheck(app);
  setupRoutes(app);
  return app;
};
