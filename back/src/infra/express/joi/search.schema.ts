import Joi = require('joi');

export const searchSchema = Joi.object({
    query: { city: Joi.string().required() },
}).required();
