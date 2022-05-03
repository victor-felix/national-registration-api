import express, { Express } from 'express';
import compression from 'compression';
import cors from './cors';
import handlerError from './handler-error';

export default (app: Express): void => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors);
  app.use(handlerError);
  app.use(compression());
};
