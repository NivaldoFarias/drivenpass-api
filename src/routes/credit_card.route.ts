import { Router } from 'express';

import useMiddleware from '../middlewares/global.middleware';

import * as middleware from '../middlewares/credit_card.middleware';
import * as controller from '../controllers/credit_card.controller';
import * as schema from '../models/credit_card.model';

const credit_cards = Router();
const endpoint = '/credit-cards';

const createEndpoint = '/create';
credit_cards.post(
  createEndpoint,
  useMiddleware(
    { schema: schema.create, token: true },
    endpoint + createEndpoint,
  ),
  middleware.createValidations,
  controller.create,
);

const getAllEndpoint = '/all';
credit_cards.get(
  getAllEndpoint,
  useMiddleware({ token: true }, endpoint + getAllEndpoint),
  controller.getAll,
);

const getByIdEndpoint = '/:id';
credit_cards.get(
  getByIdEndpoint,
  useMiddleware({ token: true }, endpoint + getByIdEndpoint),
  middleware.getByIdValidations,
  controller.getById,
);

const deleteEndpoint = getByIdEndpoint + '/delete';
credit_cards.delete(
  deleteEndpoint,
  useMiddleware({ token: true }, endpoint + deleteEndpoint),
  middleware.deleteValidations,
  controller.deleteOne,
);

export default credit_cards;
