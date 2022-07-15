import { Request, Response } from 'express';
import { documents } from '@prisma/client';

import * as repository from '../repositories/document.repository';
import * as service from '../services/document.service';

import AppLog from '../events/AppLog';

async function create(_req: Request, res: Response) {
  const body = res.locals.body;
  const subject = Number(res.locals.subject);

  const data: documents = service.processData(body, subject);
  await repository.create(data);

  AppLog('Controller', 'Document created');
  return res.sendStatus(201);
}

async function getAll(_req: Request, res: Response) {
  const user_id = Number(res.locals.subject);

  const data: documents[] = await repository.findAll(user_id);

  AppLog('Controller', 'Documents retrieved');
  return res.send(data);
}

function getById(_req: Request, res: Response) {
  const document: documents = res.locals.document;

  AppLog('Controller', 'Document retrieved');
  return res.send(document);
}

async function deleteOne(_req: Request, res: Response) {
  const id = Number(res.locals.id);
  await repository.deleteOne(id);

  AppLog('Controller', 'Document deleted');
  return res.sendStatus(200);
}

export { create, getAll, getById, deleteOne };
