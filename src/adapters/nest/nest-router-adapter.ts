import type { ControllerContractPresentation } from '@/presentation/contracts';
import { Presenter } from '@/presentation/presenter/presenter-presentation';
import type { ControllerRequestType } from '@/presentation/types';
import type { Request, Response } from 'express';

export class NestRouterAdapter {
  constructor(private readonly controller: ControllerContractPresentation) {}

  async adapt(req: Request, res: Response) {
    const request: ControllerRequestType = {
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const response = await this.controller.handle(request);

    const presenterFormat = Presenter.execute(response.body, req.headers['accept']);

    res.status(response.statusCode).send(presenterFormat);
  }
}
