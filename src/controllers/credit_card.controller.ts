import { Request, Response } from 'express';
import { credit_cards } from '@prisma/client';

import * as repository from '../repositories/credit_card.repository';
import * as service from '../services/credit_card.service';

import AppLog from '../events/AppLog';

async function create(_req: Request, res: Response) {
  const body = res.locals.body;
  const subject = Number(res.locals.subject);

  const data = service.processData(body, subject);
  await repository.create(data);

  AppLog('Controller', 'Credit card created');
  return res.sendStatus(201);
}

async function getAll(_req: Request, res: Response) {
  const user_id = Number(res.locals.subject);

  const data: credit_cards[] = await repository.findAll(user_id);

  AppLog('Controller', 'Credit cards retrieved');
  return res.send(data);
}

function getById(_req: Request, res: Response) {
  const credit_card: credit_cards = res.locals.credit_card;

  AppLog('Controller', 'Credit card retrieved');
  return res.send(credit_card);
}

async function deleteOne(_req: Request, res: Response) {
  const id = Number(res.locals.id);
  await repository.deleteOne(id);

  AppLog('Controller', 'Credit card deleted');
  return res.sendStatus(200);
}

export { create, getAll, getById, deleteOne };
