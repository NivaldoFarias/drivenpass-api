import { Router } from 'express';

import * as controller from '../controllers/auth.controller';

import validateSchema from '../middlewares/schema.middleware';
import registerSchema from '../models/register.model';

const authRouter = Router();
const endpoint = '/auth';

const registerEndpoint = '/register';
authRouter.post(
  registerEndpoint,
  validateSchema(registerSchema, endpoint + registerEndpoint),
  controller.register,
);

export default authRouter;
