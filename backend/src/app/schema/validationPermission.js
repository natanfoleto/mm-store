import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  permissionSearch: Joi.object().keys({
    tipo: Joi
      .string()
      .allow('')
      .required()
      .messages({
        'any.required': 'parâmetro tipo é necessário',
        'string.base': 'key deve tipo do tipo string',
      }),
    contexto: Joi
      .string()
      .allow('')
      .required()
      .messages({
        'any.required': 'parâmetro contexto é necessário',
        'string.base': 'contexto deve ser do tipo string',
      })
  }),
  permissionCreate: Joi.object().keys({
    tipo: Joi
      .string()
      .required()
      .max(1)
      .messages({
        'any.required': 'tipo é necessário',
        'string.base': 'tipo deve ser do tipo string',
        'string.empty': 'tipo não pode estar vazio',
        'string.max': 'tipo deve ter no máximo 1 caracter'
      }),
    descricao: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'descricao é necessário',
        'string.base': 'descricao deve ser do tipo string',
        'string.empty': 'descricao não pode estar vazio',
        'string.min': 'descricao deve ter mais de 4 caracteres'
      }),
    contexto: Joi
      .string()
      .messages({
        'string.base': 'contexto deve ser do tipo string',
        'string.empty': 'contexto não pode estar vazio',
      })
  }),
  permissionUpdate: Joi.object().keys({
    id_permissao: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_permissao é necessário',
        'number.base': 'id_permissao deve ser um número',
        'number.empty': 'id_permissao não pode estar vazio',
        'number.min': 'id_permissao deve ser maior que 0'
      }),
    tipo: Joi
      .string()
      .required()
      .max(1)
      .messages({
        'any.required': 'tipo é necessário',
        'string.base': 'tipo deve ser do tipo string',
        'string.empty': 'tipo não pode estar vazio',
        'string.max': 'tipo deve ter no máximo 1 caracter'
      }),
    descricao: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'descricao é necessário',
        'string.base': 'descricao deve ser do tipo string',
        'string.empty': 'descricao não pode estar vazio',
        'string.min': 'descricao deve ter mais de 4 caracteres'
      }),
    contexto: Joi
      .string()
      .messages({
        'string.base': 'contexto deve ser do tipo string',
        'string.empty': 'contexto não pode estar vazio',
      })
  }),
  permissionDelete: Joi.object().keys({
    id_permissao: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_permissao é necessário',
        'number.base': 'id_permissao deve ser um número',
        'number.empty': 'id_permissao não pode estar vazio',
        'number.min': 'id_permissao deve ser maior que 0'
      }),
  }),
}

export default validationSchemas