import Joi from "@hapi/joi";

export const createUserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});
