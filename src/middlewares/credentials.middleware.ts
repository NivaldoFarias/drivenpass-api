import { Request, Response, NextFunction } from 'express';
import { CredentialReqBody } from '../types/credential';

async function createCredentialValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password, label }: CredentialReqBody = res.locals.body;

  return next();
}

export { createCredentialValidations };
