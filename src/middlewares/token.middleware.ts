import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { env } from '../utils/constants.util';

import AppError from '../config/error';
import AppLog from '../events/AppLog';

async function requireToken(_req: Request, res: Response, next: NextFunction) {
  const authorization: string = res.locals.header;
  const token = parseToken(authorization);

  try {
    const { sub } = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    res.locals.subject = sub;
  } catch (error: any) {
    throw new AppError(`Invalid token`, 403, `Invalid token`, error);
  }

  AppLog('Middleware', 'Valid token');
  return next();
}

function parseToken(header: string) {
  return header.replace('Bearer ', '').trim() ?? null;
}

export default requireToken;
