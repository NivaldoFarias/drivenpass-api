import Joi from 'joi';
import { regex } from '../utils/constants.util';

const signInSchema = Joi.object({
  email: Joi.string().email().pattern(regex.EMAIL).required(),
  password: Joi.string().min(8).required(),
});

export default signInSchema;
