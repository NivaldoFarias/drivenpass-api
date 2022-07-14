import { Request, Response, NextFunction } from 'express';

import UseMiddleware from '../types/middleware';
import AppLog from '../events/AppLog';

import validateSchema from './schema.middleware';
import processHeader from './header.middleware';
import requireToken from './token.middleware';
import { TablesModels } from '../types/tables';
import AppError from '../config/error';

function useMiddleware(middlewares: UseMiddleware, endpoint: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    AppLog('Server', `Routing ...${endpoint}`);

    if (middlewares.schema) {
      validateSchema(middlewares.schema, req.body);
      res.locals.body = req.body;
    }

    if (middlewares.header) {
      processHeader(req.header(middlewares.header));
      res.locals.header = req.header(middlewares.header);
    }

    if (middlewares.token) {
      processHeader(req.header('Authorization'));
      res.locals.subject = await requireToken(
        req.header('Authorization') ?? '',
      );
    }

    return next();
  };
}

function validateParameters(id: number) {
  if (!id || isNaN(id)) {
    throw new AppError(
      'Invalid parameters',
      400,
      'Invalid parameters',
      'Ensure to provide the required parameters',
    );
  }

  AppLog('Middleware', 'Valid ID');
}

function entityExists(entity: TablesModels | null, table_name: string) {
  if (!entity) {
    throw new AppError(
      `${table_name} not found`,
      404,
      `${table_name} not found`,
      'Ensure to provide a valid ID',
    );
  }

  AppLog('Middleware', `${table_name} found`);
}

function belongsToUser(
  entity: TablesModels,
  owner_id: number,
  table_name: string,
) {
  console.log(entity.user_id, owner_id);
  if (entity.user_id !== owner_id) {
    throw new AppError(
      `${table_name} owner id mismatch`,
      409,
      `${table_name} owner id mismatch`,
      `The provided ${table_name} does not belong to the user`,
    );
  }

  AppLog('Middleware', `${table_name} belongs to user`);
}

export { validateParameters, belongsToUser, entityExists };
export default useMiddleware;
