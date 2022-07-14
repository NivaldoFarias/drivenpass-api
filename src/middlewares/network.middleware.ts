import { Request, Response, NextFunction } from 'express';
import { networks } from '@prisma/client';

import * as repository from '../repositories/network.repository';
import * as service from '../services/network.service';
import * as validate from './global.middleware';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function createValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { label }: networks = res.locals.body;
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

  const result = await repository.findById(id);
  validate.entityExists(result, 'Network');
  validate.belongsToUser(result, subject, 'Network');

  const network = service.processObject(result);

  res.locals.network = network;
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

  const network = await repository.findById(id);
  validate.entityExists(network, 'Network');
  validate.belongsToUser(network, subject, 'Network');

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
