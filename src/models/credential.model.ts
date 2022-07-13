import Joi from 'joi';
import { regex } from '../utils/constants.util';

const create = Joi.object({
  username: Joi.string().pattern(regex.USERNAME).required(),
  url: Joi.string().uri().required(),
  password: Joi.string().min(8).required(),
});

export { create };
