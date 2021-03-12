const JoiBase = require('joi')
const JoiDate = require('@hapi/joi-date')
const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  sessionCreate: Joi.object().keys({
    login: Joi
      .string()
      .required()
      .messages({
        'any.required': 'login é necessário',
        'string.base': 'login deve ser do tipo string',
        'string.empty': 'login não pode estar vazio',
      }),
    password: Joi
      .string()
      .required()
      .messages({
        'any.required': 'password é necessário',
        'string.base': 'password deve ser do tipo string',
        'string.empty': 'password não pode estar vazio',
      }),
  }),
}

module.exports = validationSchemas
