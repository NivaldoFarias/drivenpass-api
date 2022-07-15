import { Router } from 'express';

import * as controller from '../controllers/document.controller';
import * as middleware from '../middlewares/document.middleware';
import * as schema from '../models/document.model';

import useMiddleware from '../middlewares/global.middleware';

const documentRouter = Router();
const endpoint = '/notes';

const createEndpoint = '/create';
documentRouter.post(
  createEndpoint,
  useMiddleware(
    { schema: schema.create, token: true },
    endpoint + createEndpoint,
  ),
  middleware.createValidations,
  controller.create,
);

const getAllEndpoint = '/all';
documentRouter.get(
  getAllEndpoint,
  useMiddleware({ token: true }, endpoint + getAllEndpoint),
  controller.getAll,
);

const getByIdEndpoint = '/:id';
documentRouter.get(
  getByIdEndpoint,
  useMiddleware({ token: true }, endpoint + getByIdEndpoint),
  middleware.getByIdValidations,
  controller.getById,
);

const deleteEndpoint = getByIdEndpoint + '/delete';
documentRouter.delete(
  deleteEndpoint,
  useMiddleware({ token: true }, endpoint + deleteEndpoint),
  middleware.deleteValidations,
  controller.deleteOne,
);

export default documentRouter;
