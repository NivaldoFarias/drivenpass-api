import { Request, Response } from 'express';
import { notes } from '@prisma/client';

import * as repository from '../repositories/note.repository';
import * as service from '../services/note.service';

import AppLog from '../events/AppLog';

async function create(_req: Request, res: Response) {
  const body = res.locals.body;
  const subject = Number(res.locals.subject);

  const data = await service.processData(body, subject);
  await repository.create(data);

  AppLog('Controller', 'Note created');
  return res.sendStatus(201);
}

export { create };
