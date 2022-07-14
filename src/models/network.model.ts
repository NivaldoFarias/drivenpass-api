import Joi from 'joi';

const create = Joi.object({
  name: Joi.string().required(),
  label: Joi.string().max(50).required(),
  password: Joi.string().required(),
});

export { create };
