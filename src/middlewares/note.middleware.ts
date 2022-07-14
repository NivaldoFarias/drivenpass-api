import { Request, Response, NextFunction } from 'express';
import { notes } from '@prisma/client';

import * as validate from './../middlewares/global.middleware';
import * as repository from '../repositories/note.repository';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function createValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { label }: notes = res.locals.body;
  const subject = Number(res.locals.subject);

  await validateLabel(label, subject);

  return next();
}

async function getByIdValidations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);
  const subject = Number(res.locals.subject);

  validate.validateParameters(id);

  const note = await repository.findById(id);
  validate.entityExists(note, 'Note');
  validate.belongsToUser(note, subject, 'Note');

  res.locals.note = note;
  return next();
}

async function deleteValidations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);
  const subject = Number(res.locals.subject);

  validate.validateParameters(id);

  const note = await repository.findById(id);
  validate.entityExists(note, 'Note');
  validate.belongsToUser(note, subject, 'Note');

  res.locals.id = id;
  return next();
}

// Local Utils
async function validateLabel(label: string, owner_id: number) {
  const usersAlreadyUsedLabel = await repository.findUserByLabel(
    label,
    owner_id,
  );

  if (usersAlreadyUsedLabel) {
    throw new AppError(
      'Label already in use',
      409,
      'Label already in use',
      'A Label can only be used once per user',
    );
  }

  return AppLog('Middleware', 'Valid Label');
}

export { createValidations, getByIdValidations, deleteValidations };
