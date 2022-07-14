import { Request, Response } from 'express';

import * as service from '../services/credential.service';
import * as repository from '../repositories/credential.repository';

import AppLog from '../events/AppLog';
import { credentials } from '@prisma/client';

async function create(_req: Request, res: Response) {
  const body = res.locals.body;
  const subject = Number(res.locals.subject);

  const data = await service.processData(body, subject);
  await repository.create(data);

  AppLog('Controller', 'Credential created');
  return res.sendStatus(201);
}

async function getAll(_req: Request, res: Response) {
  const data: credentials[] = await repository.findAll();

  AppLog('Controller', 'Credentials retrieved');
  return res.send(data);
}
function getById(_req: Request, res: Response) {
  const credential: credentials = res.locals.credential;

  AppLog('Controller', 'Credential retrieved');
  return res.send(credential);
}

export { create, getAll, getById };
