import { Router } from 'express';

import * as controller from '../controllers/network.controller';
import * as middleware from '../middlewares/network.middleware';
import * as schema from '../models/network.model';

import useMiddleware from '../middlewares/global.middleware';

const networksRoutes = Router();
const endpoint = '/networks';

const createEndpoint = '/create';
networksRoutes.post(
  createEndpoint,
  useMiddleware(
    { schema: schema.create, token: true },
    endpoint + createEndpoint,
  ),
  controller.create,
);

const getAllEndpoint = '/all';
networksRoutes.get(
  getAllEndpoint,
  useMiddleware({ token: true }, endpoint + getAllEndpoint),
  controller.getAll,
);

const getByIdEndpoint = '/:id';
networksRoutes.get(
  getByIdEndpoint,
  useMiddleware({ token: true }, endpoint + getByIdEndpoint),
  middleware.getByIdValidations,
  controller.getById,
);

const deleteEndpoint = getByIdEndpoint + '/delete';
networksRoutes.delete(
  deleteEndpoint,
  useMiddleware({ token: true }, endpoint + deleteEndpoint),
  middleware.deleteValidations,
  controller.deleteOne,
);

export default networksRoutes;
