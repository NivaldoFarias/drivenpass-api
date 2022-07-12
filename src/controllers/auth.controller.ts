import { Request, Response } from 'express';
import './../config/setup';

import { UserRegister } from '../types/user';
import AppLog from '../events/AppLog';

import * as repository from './../repositories/auth.repository';
import * as service from './../services/auth.service';

async function register(_req: Request, res: Response) {
  const body: UserRegister = res.locals.body;
  const password = service.hashPassword(body.password);

  const data = {
    ...body,
    password,
  };
  await repository.register(data);

  AppLog('Controller', 'User signed up');
  return res.sendStatus(201);
}

function signIn(_req: Request, res: Response) {
  const {
    user: { id },
  } = res.locals;

  const token = service.generateToken(id);

  AppLog('Controller', 'User signed in');
  return res.status(200).send({ token });
}

export { register, signIn };
