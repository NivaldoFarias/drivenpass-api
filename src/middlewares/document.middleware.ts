import { Request, Response, NextFunction } from 'express';
import { documents } from '@prisma/client';

import * as validate from './../middlewares/global.middleware';
import * as repository from '../repositories/document.repository';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function createValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { exp_date, emission_date, label, type, registry_number }: documents =
    res.locals.body;
  const subject = Number(res.locals.subject);

  validateExpDate(exp_date);
  validateEmissionDate(emission_date);
  validateDocumentType(type, registry_number);
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

  const document = await repository.findById(id);
  validate.entityExists(document, 'Document');
  validate.belongsToUser(document, subject, 'Document');

  res.locals.document = document;
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

  const document = await repository.findById(id);
  validate.entityExists(document, 'Document');
  validate.belongsToUser(document, subject, 'Document');

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

function validateExpDate(exp_date: string) {
  const dateIsNaN = isNaN(new Date(exp_date).getTime());
  const isExpired = new Date(exp_date).toISOString() < new Date().toISOString();

  if (dateIsNaN || isExpired) {
    throw new AppError(
      `Invalid expiration date`,
      400,
      `Invalid expiration date`,
      'The provided document is expired or the date format is invalid',
    );
  }

  AppLog('Middleware', 'Valid expiration date');
}

function validateEmissionDate(emission_date: string) {
  const dateIsNaN = isNaN(new Date(emission_date).getTime());
  const invalidDate =
    new Date(emission_date).toISOString() > new Date().toISOString();

  if (invalidDate || dateIsNaN) {
    throw new AppError(
      `Invalid emission date`,
      400,
      `Invalid emission date`,
      'The provided document is invalid',
    );
  }

  AppLog('Middleware', 'Valid emission date');
}

function validateDocumentType(type: string, registry_number: string) {
  if (
    type === 'CNH' &&
    (registry_number.length <= 5 || registry_number.length > 13)
  ) {
    throw new AppError(
      `Invalid CNH registry number`,
      400,
      `Invalid CNH registry number`,
      'The provided document is invalid',
    );
  }

  if (
    type === 'RG' &&
    (registry_number.length <= 4 || registry_number.length > 14)
  ) {
    throw new AppError(
      `Invalid RG registry number`,
      400,
      `Invalid RG registry number`,
      'The provided document is invalid',
    );
  }

  AppLog('Middleware', 'Valid document type');
}

export { createValidations, getByIdValidations, deleteValidations };
