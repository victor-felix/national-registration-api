import { NextFunction, Request, Response } from 'express';
import config from '@main/config';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {

  if (config.PROD) {
    res.status(500).json({
      code: 'SERVER-000',
      message: 'Internal server error',
    });
    return;
  }

  res.status(500).json({
    code: 'SERVER-000',
    message: err.message,
    stack: err.stack,
    exception: err,
  });
};
