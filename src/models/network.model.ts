import Joi from 'joi';

const create = Joi.object({
  label: Joi.string().max(50).required(),
  password: Joi.string().required(),
});

export { create };
