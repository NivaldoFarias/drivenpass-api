import { Request, Response, NextFunction } from 'express';
import { Prisma, users } from '@prisma/client';

import * as repository from '../repositories/auth.repository';
import * as service from '../services/auth.service';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

// Middlewares
async function registerValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const body: Prisma.usersCreateInput = res.locals.body;
  const { email } = body;

  const result = await repository.findByEmail(email);

  emailIsUnique(result);

  return next();
}

async function signInValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const body: Prisma.usersCreateInput = res.locals.body;
  const { email, password } = body;

  const result = await repository.findByEmail(email);

  userExists(result);
  emailsIsRegistered(email);
  validPassword(password, result?.password);

  res.locals.user = result;
  return next();
}

// Validations
function userExists(user: users | null) {
  if (!user) {
    throw new AppError(
      'User not found',
      404,
      'User not found',
      'Ensure to provide a valid email address',
    );
  }

  return AppLog('Middleware', 'User exists');
}

function emailIsUnique(result: users | null) {
  if (result) {
    throw new AppError(
      'Email already registered',
      409,
      'Email already registered',
      'Ensure to provide an email address that is not already in use',
    );
  }
  return AppLog('Middleware', 'Email is unique');
}

function emailsIsRegistered(email: string) {
  if (!email) {
    throw new AppError(
      'Email is not registered',
      404,
      'Email is not registered',
      'Ensure to provide an email address that is registered',
    );
  }
  return AppLog('Middleware', 'Email is registered');
}

function validPassword(providedPassword: string, password: string = '') {
  const isValid = service.decryptPassword(providedPassword, password);

  if (!isValid) {
    throw new AppError(
      'Invalid password',
      403,
      'Invalid password',
      'Ensure to provide a valid password',
    );
  }
  return AppLog('Middleware', 'Valid password');
}

export { registerValidations, signInValidations };
