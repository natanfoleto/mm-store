import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  userSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  userCreate: Joi.object().keys({
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
      .min(4)
      .messages({
        'any.required': 'nome é necessário',
        'string.base': 'nome deve ser do tipo string',
        'string.empty': 'nome não pode estar vazio',
        'string.min': 'nome deve ter mais de 4 caracteres'
      }),
    login: Joi
      .string()
      .required()
      .min(5)
      .messages({
        'any.required': 'login é necessário',
        'string.base': 'login deve ser do tipo string',
        'string.empty': 'login não pode estar vazio',
        'string.min': 'login deve ter mais de 5 caracteres'
      }),
    password: Joi
      .string()
      .required()
      .min(6)
      .max(32)
      .messages({
        'any.required': 'password é necessário',
        'string.base': 'password deve ser do tipo string',
        'string.empty': 'password não pode estar vazio',
        'string.min': 'password deve ter mais de 6 caracteres',
        'string.max': 'password deve ter menos de 32 caracteres'
      })
  }),
  userUpdate: Joi.object().keys({
    id_usuario: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_usuario é necessário',
        'number.base': 'id_usuario deve ser do tipo number',
        'number.empty': 'id_usuario não pode estar vazio',
        'number.min': 'id_usuario deve ser maior que 0'
      }),
    id_perfil: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_perfil é necessário',
        'number.base': 'id_perfil deve ser do tipo number',
        'number.empty': 'id_perfil não pode estar vazio',
        'number.min': 'id_perfil deve ser maior que 0'
      }),
    nome: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'nome é necessário',
        'string.base': 'nome deve ser do tipo string',
        'string.empty': 'nome não pode estar vazio',
        'string.min': 'nome deve ter mais de 4 caracteres'
      }),
    login: Joi
      .string()
      .required()
      .min(5)
      .messages({
        'any.required': 'login é necessário',
        'string.base': 'login deve ser do tipo string',
        'string.empty': 'login não pode estar vazio',
        'string.min': 'login deve ter mais de 5 caracteres'
      })
  }),
  userDelete: Joi.object().keys({
    id_usuario: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_usuario é necessário',
        'number.base': 'id_usuario deve ser um número',
        'number.empty': 'id_usuario não pode estar vazio',
        'number.min': 'id_usuario deve ser maior que 0'
      })
  })
}

export default validationSchemas
