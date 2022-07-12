import Joi from 'joi';
import { regex } from '../utils/constants.util';

const registerSchema = Joi.object({
  username: Joi.string().pattern(regex.USERNAME).required(),
  email: Joi.string().email().pattern(regex.EMAIL).required(),
  password: Joi.string().min(8).required(),
});

export default registerSchema;
