import { Request, Response, NextFunction } from 'express';

import { CredentialReqBody } from '../types/credential';

import * as queries from '../utils/queries.util';
import AppLog from '../events/AppLog';
import urlExist from 'url-exist';
import AppError from '../config/error';

async function createCredentialValidations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password, url, label }: CredentialReqBody = res.locals.body;
  const subject = Number(res.locals.subject);
  1;

  validateUrl(url);
  validateLabel(label);

  const user = await queries.findUserById(subject);

  console.table(user);
  return next();
}

function validateUrl(url: string) {
  if (!urlExist(url)) {
    throw new AppError(
      'URL does not exist',
      400,
      'URL does not exist',
      'Ensure to provide a valid URL',
    );
  }

  return AppLog('Middleware', 'Valid Url');
}

function validateLabel(label: string) {
  if (label.length < 3) {
    throw new AppError(
      'Label is too short',
      400,
      'Label is too short',
      'Ensure to provide a valid label',
    );
  }

  return AppLog('Middleware', 'Valid Label');
}

export { createCredentialValidations };
