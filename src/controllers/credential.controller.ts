import { Request, Response } from 'express';

import * as service from '../services/credential.service';
import * as repository from '../repositories/credential.repository';

import AppLog from '../events/AppLog';

async function createCredential(_req: Request, res: Response) {
  const body = res.locals.body;
  const subject = Number(res.locals.subject);

  const data = await service.processData(body, subject);
  await repository.create(data);

  AppLog('Controller', 'Credential created');
  return res.sendStatus(201);
}

export { createCredential };
