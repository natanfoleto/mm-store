import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  profileSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  profileCreate: Joi.object().keys({
    nome: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'O campo nome é necessário',
        'string.base': 'O campo nome deve ser do tipo string',
        'string.empty': 'O campo nome não pode estar vazio',
        'string.min': 'O campo nome deve ter mais de 4 caracteres'
      })
  }),
  profileUpdate: Joi.object().keys({
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
    nome: Joi
      .string()
      .required()
      .min(2)
      .messages({
        'any.required': 'O campo nome é necessário',
        'string.base': 'O campo nome deve ser do tipo string',
        'string.empty': 'O campo nome não pode estar vazio',
        'string.min': 'O campo nome deve ter mais de 2 caracteres'
      })
  }),
  profileDelete: Joi.object().keys({
    id_perfil: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_perfil é necessário',
        'number.base': 'O campo id_perfil deve ser um número',
        'number.empty': 'O campo id_perfil não pode estar vazio',
        'number.min': 'O campo id_perfil deve ser maior que 0'
      })
  })
}

export default validationSchemas
