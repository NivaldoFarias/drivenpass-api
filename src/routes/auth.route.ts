import { Router } from 'express';

import * as controller from '../controllers/auth.controller';
import * as middleware from '../middlewares/auth.middleware';

import validateSchema from '../middlewares/schema.middleware';
import registerSchema from '../models/register.model';
import signInSchema from '../models/signIn.model';

const authRouter = Router();
const endpoint = '/auth';

const registerEndpoint = '/register';
authRouter.post(
  registerEndpoint,
  validateSchema(registerSchema, endpoint + registerEndpoint),
  middleware.registerValidations,
  controller.register,
);

const signInEndpoint = '/sign-in';
authRouter.use(
  signInEndpoint,
  validateSchema(signInSchema, endpoint + signInEndpoint),
  middleware.signInValidations,
  controller.signIn,
);

export default authRouter;
