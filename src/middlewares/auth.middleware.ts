import { Request, Response, NextFunction } from 'express';

import * as repository from '../repositories/auth.repository';

import { users } from '@prisma/client';
import { UserRegister } from '../types/user';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function registerValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const body: UserRegister = res.locals.body;
  const { email } = body;

  const result = await repository.findByEmail(email);

  emailIsUnique(result);

  return next();
}

function emailIsUnique(result: users | null) {
  if (result) {
    throw new AppError(
      'Email already exists',
      409,
      'Email already exists',
      'Ensure to provide an email address that is not already in use',
    );
  }
  return AppLog('Middleware', 'Email is unique');
}

export { registerValidations };
