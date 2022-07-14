import Joi from 'joi';

const create = Joi.object({
  label: Joi.string().max(50).required(),
  content: Joi.string().max(1000).required(),
});

export { create };
