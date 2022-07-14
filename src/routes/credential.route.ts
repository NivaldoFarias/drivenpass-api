import { Router } from 'express';

import * as middleware from '../middlewares/credential.middleware';
import * as controller from '../controllers/credential.controller';
import * as schema from '../models/credential.model';

import validateSchema from '../middlewares/schema.middleware';

const credentialRouter = Router();
const endpoint = '/credentials';

const createEndpoint = '/create';
credentialRouter.post(
  createEndpoint,
  validateSchema(schema.create, endpoint + createEndpoint),
  middleware.createValidations,
  controller.createCredential,
);

export default credentialRouter;
