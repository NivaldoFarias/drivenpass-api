import { Router } from 'express';

import * as controller from '../controllers/note.controller';
import * as middleware from '../middlewares/note.middleware';
import * as schema from '../models/note.model';

import useMiddleware from '../middlewares/global.middleware';

const notesRouter = Router();
const endpoint = '/notes';

const createEndpoint = '/create';
notesRouter.post(
  createEndpoint,
  useMiddleware(
    { schema: schema.create, token: true },
    endpoint + createEndpoint,
  ),
  middleware.createValidations,
  controller.create,
);

const getAllEndpoint = '/all';
notesRouter.get(
  getAllEndpoint,
  useMiddleware({ token: true }, endpoint + getAllEndpoint),
  controller.getAll,
);

const getByIdEndpoint = '/:id';
notesRouter.get(
  getByIdEndpoint,
  useMiddleware({ token: true }, endpoint + getByIdEndpoint),
  middleware.getByIdValidations,
  controller.getById,
);

const deleteEndpoint = getByIdEndpoint + '/delete';
notesRouter.delete(
  deleteEndpoint,
  useMiddleware({ token: true }, endpoint + deleteEndpoint),
  middleware.deleteValidations,
  controller.deleteOne,
);

export default notesRouter;
