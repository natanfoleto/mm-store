const JoiBase = require('joi')
const JoiDate = require('@hapi/joi-date')
const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  profileSearch: Joi.object().keys({
    nome: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'nome é necessário',
        'string.base': 'nome deve ser do tipo string',
      })
  }),
  profileCreate: Joi.object().keys({
    nome: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'nome é necessário',
        'string.base': 'nome deve ser do tipo string',
        'string.empty': 'nome não pode estar vazio',
        'string.min': 'nome deve ter mais de 4 caracteres'
      })
  }),
  profileUpdate: Joi.object().keys({
    id_perfil: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_perfil é necessário',
        'number.base': 'id_perfil deve ser um número',
        'number.empty': 'id_perfil não pode estar vazio',
        'number.min': 'id_perfil deve ser maior que 0'
      }),
    nome: Joi
      .string()
      .required()
      .min(2)
      .messages({
        'any.required': 'nome é necessário',
        'string.base': 'nome deve ser do tipo string',
        'string.empty': 'nome não pode estar vazio',
        'string.min': 'nome deve ter mais de 2 caracteres'
      })
  }),
  profileDelete: Joi.object().keys({
    id_perfil: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_perfil é necessário',
        'number.base': 'id_perfil deve ser um número',
        'number.empty': 'id_perfil não pode estar vazio',
        'number.min': 'id_perfil deve ser maior que 0'
      }),
  }),
}

module.exports = validationSchemas
