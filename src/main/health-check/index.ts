import express, { Request, Response, Express } from 'express';

export default (app: Express): void => {
  const actuator = express.Router();
  actuator.get('/health', (req: Request, res: Response): void => {
    res.json({ status: 'UP' });
  });
  app.use('/actuator', actuator);
};
