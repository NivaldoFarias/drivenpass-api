import Joi from 'joi';

const create = Joi.object({
  label: Joi.string().max(50).required(),
  number: Joi.string().length(16).required(),
  exp_date: Joi.string().length(5).required(),
  password: Joi.string().length(4).required(),
  cvc: Joi.string().length(3).required(),
  owner: Joi.string().required(),
  is_virtual: Joi.boolean().required(),
  type: Joi.string().valid('CREDIT', 'DEBIT', 'BOTH').required(),
});

export { create };
