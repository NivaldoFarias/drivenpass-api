import { Request, Response } from 'express';
import { notes } from '@prisma/client';

import * as repository from '../repositories/note.repository';
import * as service from '../services/note.service';

import AppLog from '../events/AppLog';

async function create(_req: Request, res: Response) {
  const body = res.locals.body;
  const subject = Number(res.locals.subject);

  const data: notes = service.processData(body, subject);
  await repository.create(data);

  AppLog('Controller', 'Note created');
  return res.sendStatus(201);
}

async function getAll(_req: Request, res: Response) {
  const user_id = Number(res.locals.subject);

  const data: notes[] = await repository.findAll(user_id);

  AppLog('Controller', 'Notes retrieved');
  return res.send(data);
}

function getById(_req: Request, res: Response) {
  const note: notes = res.locals.note;

  AppLog('Controller', 'Note retrieved');
  return res.send(note);
}

async function deleteOne(_req: Request, res: Response) {
  const id = Number(res.locals.id);
  await repository.deleteOne(id);

  AppLog('Controller', 'Note deleted');
  return res.sendStatus(200);
}

export { create, getAll, getById, deleteOne };
