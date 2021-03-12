const JoiBase = require('joi')
const JoiDate = require('@hapi/joi-date')
const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  photoCreate: Joi.object().keys({
    id_produto: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_produto é necessário',
        'number.base': 'id_produto deve ser um número',
        'number.empty': 'id_produto não pode estar vazio',
        'number.min': 'id_produto deve ser maior que 0'
      }),
    nome: Joi
      .string()
      .allow(null)
      .min(4)
      .messages({
        'string.base': 'nome deve ser do tipo string',
        'string.empty': 'nome não pode estar vazio',
        'string.min': 'nome deve ter mais de 4 caracteres'
      }),
    path: Joi
      .string()
      .required()
      .messages({
        'any.required': 'path é necessário',
        'string.base': 'path deve ser do tipo string',
        'string.empty': 'path não pode estar vazio',
      }),
    url: Joi
      .string()
      .required()
      .messages({
        'any.required': 'url é necessário',
        'string.base': 'url deve ser do tipo string',
        'string.empty': 'url não pode estar vazio',
      }),
  }),
  photoDelete: Joi.object().keys({
    id_foto: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_foto é necessário',
        'number.base': 'id_foto deve ser um número',
        'number.empty': 'id_foto não pode estar vazio',
        'number.min': 'id_foto deve ser maior que 0'
      }),
  }),
}

module.exports = validationSchemas
