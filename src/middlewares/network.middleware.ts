import { Request, Response, NextFunction } from 'express';
import { networks } from '@prisma/client';

import * as repository from '../repositories/network.repository';
import * as service from '../services/network.service';
import * as validate from './global.middleware';

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
  validate.belongsToUser(result as networks, subject, 'Network');

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
  validate.belongsToUser(network as networks, subject, 'Network');

  res.locals.id = id;
  return next();
}

export { getByIdValidations, deleteValidations };
