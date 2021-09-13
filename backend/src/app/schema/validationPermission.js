import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  permissionSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  permissionSearchForProfile: Joi.object().keys({
    id_perfil: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_perfil é necessário',
        'number.base': 'O campo id_perfil deve ser um número',
        'number.empty': 'O campo id_perfil não pode estar vazio',
        'number.min': 'O campo id_perfil deve ser maior que 0'
      }),
    tipo: Joi
      .string()
      .allow('')
      .required()
      .messages({
        'any.required': 'O campo parâmetro tipo é necessário',
        'string.base': 'O campo key deve tipo do tipo string'
      }),
    contexto: Joi
      .string()
      .allow('')
      .required()
      .messages({
        'any.required': 'O campo parâmetro contexto é necessário',
        'string.base': 'O campo contexto deve ser do tipo string'
      })
  }),
  permissionCreate: Joi.object().keys({
    nome: Joi
      .string()
      .required()
      .max(50)
      .min(4)
      .messages({
        'any.required': 'O campo nome é necessário',
        'string.base': 'O campo nome deve ser do tipo string',
        'string.empty': 'O campo nome não pode estar vazio',
        'string.max': 'O campo nome deve ter no máximo 1 caracter',
        'string.min': 'O campo nome deve ter mais de 4 caracteres'

      }),
    tipo: Joi
      .string()
      .required()
      .max(25)
      .messages({
        'any.required': 'O campo tipo é necessário',
        'string.base': 'O campo tipo deve ser do tipo string',
        'string.empty': 'O campo tipo não pode estar vazio',
        'string.max': 'O campo tipo deve ter no máximo 1 caracter'
      }),
    descricao: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'O campo descricao é necessário',
        'string.base': 'O campo descricao deve ser do tipo string',
        'string.empty': 'O campo descricao não pode estar vazio',
        'string.min': 'O campo descricao deve ter mais de 4 caracteres'
      }),
    contexto: Joi
      .string()
      .messages({
        'string.base': 'O campo contexto deve ser do tipo string',
        'string.empty': 'O campo contexto não pode estar vazio'
      })
  }),
  permissionUpdate: Joi.object().keys({
    id_permissao: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_permissao é necessário',
        'number.base': 'O campo id_permissao deve ser um número',
        'number.empty': 'O campo id_permissao não pode estar vazio',
        'number.min': 'O campo id_permissao deve ser maior que 0'
      }),
    nome: Joi
      .string()
      .required()
      .max(50)
      .messages({
        'any.required': 'O campo nome é necessário',
        'string.base': 'O campo nome deve ser do tipo string',
        'string.empty': 'O campo nome não pode estar vazio',
        'string.max': 'O campo nome deve ter no máximo 1 caracter'
      }),
    tipo: Joi
      .string()
      .required()
      .max(25)
      .messages({
        'any.required': 'O campo tipo é necessário',
        'string.base': 'O campo tipo deve ser do tipo string',
        'string.empty': 'O campo tipo não pode estar vazio',
        'string.max': 'O campo tipo deve ter no máximo 1 caracter'
      }),
    descricao: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'O campo descricao é necessário',
        'string.base': 'O campo descricao deve ser do tipo string',
        'string.empty': 'O campo descricao não pode estar vazio',
        'string.min': 'O campo descricao deve ter mais de 4 caracteres'
      }),
    contexto: Joi
      .string()
      .messages({
        'string.base': 'O campo contexto deve ser do tipo string',
        'string.empty': 'O campo contexto não pode estar vazio'
      })
  }),
  permissionDelete: Joi.object().keys({
    id_permissao: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_permissao é necessário',
        'number.base': 'O campo id_permissao deve ser um número',
        'number.empty': 'O campo id_permissao não pode estar vazio',
        'number.min': 'O campo id_permissao deve ser maior que 0'
      })
  })
}

export default validationSchemas
