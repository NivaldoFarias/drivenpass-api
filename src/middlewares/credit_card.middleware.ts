import { Request, Response, NextFunction } from 'express';
import { credit_cards } from '@prisma/client';

import * as repository from './../repositories/credit_card.repository';
import * as service from './../services/credit_card.service';
import * as validate from './global.middleware';

import { database, time } from '../utils/constants.util';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function createValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { exp_date, label }: credit_cards = res.locals.body;
  const subject = Number(res.locals.subject);

  await validateLabel(label, subject);
  validateExpDate(exp_date);

  return next();
}

async function getByIdValidations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);
  const subject = Number(res.locals.subject);

  validate.validateParameters(id, database.INT4_MAX);

  const result = await repository.findById(id);
  validate.entityExists(result, 'Credit card');
  validate.belongsToUser(result, subject, 'Credit card');

  const credit_card = service.processObject(result);

  res.locals.credit_card = credit_card;
  return next();
}

async function deleteValidations(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = Number(req.params.id);
  const subject = Number(res.locals.subject);

  validate.validateParameters(id, database.INT4_MAX);

  const result = await repository.findById(id);
  validate.entityExists(result, 'Credit card');
  validate.belongsToUser(result, subject, 'Credit card');

  res.locals.id = id;
  return next();
}

export { createValidations, getByIdValidations, deleteValidations };

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

function validateExpDate(exp_date: string) {
  const [monthStr, yearStr] = exp_date.split('/');
  const [month, year] = [Number(monthStr), Number(yearStr)];

  const invalidDateFormat = month > 12 || month < 1 || year < 0;
  const invalidExpirationDate =
    year < time.CURRENT_YEAR ||
    (year === time.CURRENT_YEAR && month < time.CURRENT_MONTH);

  if (invalidDateFormat || invalidExpirationDate) {
    throw new AppError(
      `Invalid expiration date`,
      403,
      `Invalid expiration date`,
      'The provided card is expired',
    );
  }

  AppLog('Middleware', 'Valid expiration date');
}
