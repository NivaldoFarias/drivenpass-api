import { Request, Response, NextFunction } from 'express';

import UseMiddleware from '../types/middleware';
import AppLog from '../events/AppLog';

import validateSchema from './schema.middleware';
import processHeader from './header.middleware';
import requireToken from './token.middleware';

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

export default useMiddleware;
