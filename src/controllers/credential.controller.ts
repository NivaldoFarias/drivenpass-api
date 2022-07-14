import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

import * as repository from '../repositories/credential.repository';
import AppLog from '../events/AppLog';

async function createCredential(_req: Request, res: Response) {
  const data: Prisma.credentialsCreateInput = res.locals.body;

  await repository.create(data);

  AppLog('Controller', 'Credential created');
  return res.sendStatus(201);
}

export { createCredential };
