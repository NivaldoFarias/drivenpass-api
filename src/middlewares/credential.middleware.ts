import { Request, Response, NextFunction } from 'express';
import { Prisma, credentials } from '@prisma/client';

import * as repository from './../repositories/credential.repository';
import urlExist from '../utils/url.util';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function createValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { url, label }: Prisma.credentialsCreateInput = res.locals.body;
  const subject = Number(res.locals.subject);

  await Promise.all([
    await validateUrl(url),
    await validateLabel(label, subject),
  ]);

  return next();
}

async function getByIdValidations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);
  validateParameters(id);

  const credential = await repository.findById(id);
  validateCredential(credential);

  res.locals.credential = credential;
  return next();
}

export { createValidations, getByIdValidations };

// Local Utils
async function validateUrl(url: string) {
  const validUrl = await urlExist(url);

  if (!validUrl) {
    throw new AppError(
      'URL does not exist',
      400,
      'URL does not exist',
      'Ensure to provide a valid URL',
    );
  }

  return AppLog('Middleware', 'Valid Url');
}

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

function validateParameters(id: number) {
  if (!id) {
    throw new AppError(
      'ID is required',
      400,
      'ID is required',
      'Ensure to provide a ID',
    );
  }

  AppLog('Middleware', 'Valid ID');
}

function validateCredential(credential: credentials | null) {
  if (!credential) {
    throw new AppError(
      'Credential not found',
      404,
      'Credential not found',
      'Ensure to provide a valid ID',
    );
  }

  AppLog('Middleware', 'Valid Credential');
}
