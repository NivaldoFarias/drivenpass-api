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
  controller.create,
);

const getAllEndpoint = '/all';
credentialRouter.get(
  getAllEndpoint,
  useMiddleware({ token: true }, endpoint + getAllEndpoint),
  controller.getAll,
);

const getByIdEndpoint = '/:id';
credentialRouter.get(
  getByIdEndpoint,
  useMiddleware({ token: true }, endpoint + getByIdEndpoint),
  middleware.getByIdValidations,
  controller.getById,
);

const deleteEndpoint = getByIdEndpoint + '/delete';
credentialRouter.delete(
  deleteEndpoint,
  useMiddleware({ token: true }, endpoint + deleteEndpoint),
  middleware.deleteValidations,
  controller.deleteOne,
);

export default credentialRouter;
