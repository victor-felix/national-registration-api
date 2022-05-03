import { Request, Response } from 'express';
import Controller from '@adapters/controllers/port/controller';
import HttpRequest from '@adapters/controllers/port/http-request';

const adapterRoute =
  (controller: Controller) => async (req: Request, res: Response) => {
    const request: HttpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
    };
    const httpResponse = await controller.handle(request);
    res.status(httpResponse.statusCode).json(httpResponse.body);
  };

export default adapterRoute;
