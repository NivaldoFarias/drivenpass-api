import { Request, Response, NextFunction } from 'express';
import { notes } from '@prisma/client';

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

// Local Utils
async function validateLabel(label: string, user_id: number) {
  const usersAlreadyUsedLabel = await repository.findUserByLabel(
    label,
    user_id,
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

export { createValidations };
