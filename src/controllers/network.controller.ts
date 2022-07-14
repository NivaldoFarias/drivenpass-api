import { Request, Response } from 'express';
import { networks } from '@prisma/client';

import * as repository from '../repositories/network.repository';
import * as service from '../services/network.service';

import AppLog from '../events/AppLog';

async function create(_req: Request, res: Response) {
  const body = res.locals.body;
  const subject = Number(res.locals.subject);

  const data = await service.processData(body, subject);
  await repository.create(data);

  AppLog('Controller', 'Network created');
  return res.sendStatus(201);
}

async function getAll(_req: Request, res: Response) {
  const user_id = Number(res.locals.subject);

  const data: networks[] = await repository.findAll(user_id);

  AppLog('Controller', 'Network retrieved');
  return res.send(data);
}

function getById(_req: Request, res: Response) {
  const network: networks = res.locals.network;

  AppLog('Controller', 'Network retrieved');
  return res.send(network);
}

async function deleteOne(_req: Request, res: Response) {
  const id = Number(res.locals.id);
  await repository.deleteOne(id);

  AppLog('Controller', 'Network deleted');
  return res.sendStatus(200);
}

export { create, getAll, getById, deleteOne };
