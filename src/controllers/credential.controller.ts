import { Request, Response } from 'express';

async function createCredential(_req: Request, res: Response) {
  return res.sendStatus(201);
}

export { createCredential };
