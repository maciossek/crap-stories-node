import Joi from "@hapi/joi";

export const createStoryValidation = Joi.object({
  title: Joi.string().required(),
  imageUrl: Joi.string().required(),
});
