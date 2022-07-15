import Joi from 'joi';

const create = Joi.object({
  label: Joi.string().max(50).required(),
  full_name: Joi.string().max(100).required(),
  emission_date: Joi.string().length(10).required(),
  exp_date: Joi.string().length(10).required(),
  registry_number: Joi.string().required(),
  issuing_agency: Joi.string().max(100).required(),
  type: Joi.string().valid('RG', 'CNH').required(),
});

export { create };
