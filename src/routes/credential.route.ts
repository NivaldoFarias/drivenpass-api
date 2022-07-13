import { Router } from 'express';

import * as controller from '../controllers/credential.controller';
import * as schema from '../models/credential.model';

import validateSchema from '../middlewares/schema.middleware';
import requireToken from '../middlewares/token.middleware';

const credentialRouter = Router();
const endpoint = '/credentials';

const createEndpoint = '/create';
credentialRouter.post(
  createEndpoint,
  requireToken,
  validateSchema(schema.create, endpoint + createEndpoint),
  controller.createCredential,
);

export default credentialRouter;
