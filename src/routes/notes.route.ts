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

export default notesRouter;
