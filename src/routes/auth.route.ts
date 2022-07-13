import { Router } from 'express';

import * as controller from '../controllers/auth.controller';
import * as middleware from '../middlewares/auth.middleware';
import * as schema from '../models/auth.model';

import validateSchema from '../middlewares/schema.middleware';

const authRouter = Router();
const endpoint = '/auth';

const registerEndpoint = '/register';
authRouter.post(
  registerEndpoint,
  validateSchema(schema.register, endpoint + registerEndpoint),
  middleware.registerValidations,
  controller.register,
);

const signInEndpoint = '/sign-in';
authRouter.use(
  signInEndpoint,
  validateSchema(schema.signIn, endpoint + signInEndpoint),
  middleware.signInValidations,
  controller.signIn,
);

export default authRouter;
