import { Router } from 'express';

import useMiddleware from '../middlewares/global.middleware';

import * as middleware from '../middlewares/credential.middleware';
import * as controller from '../controllers/credential.controller';
import * as schema from '../models/credential.model';

const credentialRouter = Router();
const endpoint = '/credentials';

const createEndpoint = '/create';
credentialRouter.post(
  createEndpoint,
  useMiddleware(
    { schema: schema.create, token: true },
    endpoint + createEndpoint,
  ),
  middleware.createValidations,
  controller.createCredential,
);

export default credentialRouter;
