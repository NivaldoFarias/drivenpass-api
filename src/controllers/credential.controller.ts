import { Request, Response } from 'express';
import AppLog from '../events/AppLog';

async function createCredential(_req: Request, res: Response) {
  AppLog('Controller', 'Credential created');
  return res.sendStatus(201);
}

export { createCredential };
