import { Request, Response, NextFunction } from 'express';

import * as repository from '../repositories/auth.repository';
import * as service from '../services/auth.service';

import { users } from '@prisma/client';
import { UserRegister } from '../types/user';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

// Middlewares

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

async function signInValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const body: UserRegister = res.locals.body;
  const { email, password } = body;

  const result = await repository.findByEmail(email);

  emailsIsRegistered(email);
  validPassword(result?.password, password);

  return next();
}

// Validations

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

function validPassword(providedPassword: string = '', password: string) {
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
