import { Request, Response } from 'express';
import { credentials } from '@prisma/client';

import * as repository from '../repositories/credential.repository';
import * as service from '../services/credential.service';

import AppLog from '../events/AppLog';

async function create(_req: Request, res: Response) {
  const body = res.locals.body;
  const subject = Number(res.locals.subject);

  const data = await service.processData(body, subject);
  await repository.create(data);

  AppLog('Controller', 'Credential created');
  return res.sendStatus(201);
}

async function getAll(_req: Request, res: Response) {
  const user_id = Number(res.locals.subject);

  const data: credentials[] = await repository.findAll(user_id);

  AppLog('Controller', 'Credentials retrieved');
  return res.send(data);
}

function getById(_req: Request, res: Response) {
  const credential: credentials = res.locals.credential;

  AppLog('Controller', 'Credential retrieved');
  return res.send(credential);
}

async function deleteOne(_req: Request, res: Response) {
  const id = Number(res.locals.id);
  await repository.deleteOne(id);

  AppLog('Controller', 'Credential deleted');
  return res.sendStatus(200);
}

export { create, getAll, getById, deleteOne };
