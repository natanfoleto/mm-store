import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  clientSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  clientCreate: Joi.object().keys({
    nome: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'O campo nome é necessário',
        'string.base': 'O campo nome deve ser do tipo string',
        'string.empty': 'O campo nome não pode estar vazio',
        'string.min': 'O campo nome deve ter mais de 4 caracteres'
      }),
    cpf: Joi
      .string()
      .required()
      .min(11)
      .max(11)
      .messages({
        'any.required': 'O campo cpf é necessário',
        'string.base': 'O campo cpf deve ser do tipo string',
        'string.empty': 'O campo cpf não pode estar vazio',
        'string.min': 'O campo cpf deve conter 11 numeros',
        'string.max': 'O campo cpf deve conter apenas numeros'
      }),
    email: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'O campo email deve ser do tipo string',
        'string.empty': 'O campo email não pode estar vazio',
        'string.min': 'O campo email deve maior que 0'
      }),
    data_nasc: Joi
      .date().format(['YYYY-MM-DD']).max('now').greater('1900-1-1').utc()
      .required()
      .messages({
        'any.required': 'O campo data_nasc é necessário',
        'date.max': 'O campo data_nasc não pode ser maior que a data atual',
        'date.greater': 'O campo data_nasc dever ser maior que 1900-1-1',
        'date.format': 'O campo data_nasc deve estar no formato de YYYY-MM-DD'
      }),
    celular: Joi
      .string()
      .allow(null)
      .min(11)
      .messages({
        'string.base': 'O campo celular deve ser do tipo string',
        'string.empty': 'O campo celular não pode estar vazio',
        'string.min': 'O campo celular deve maior que 11'
      }),
    password: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'O campo password deve ser do tipo string',
        'string.empty': 'O campo password não pode estar vazio',
        'string.min': 'O campo password deve maior que 0'
      })
  }),
  clientUpdate: Joi.object().keys({
    id_cliente: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_cliente é necessário',
        'number.base': 'O campo id_cliente deve ser do tipo number',
        'number.empty': 'O campo id_cliente não pode estar vazio',
        'number.min': 'O campo id_cliente deve ser maior que 0'
      }),
    nome: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'O campo nome é necessário',
        'string.base': 'O campo nome deve ser do tipo string',
        'string.empty': 'O campo nome não pode estar vazio',
        'string.min': 'O campo nome deve ter mais de 4 caracteres'
      }),
    cpf: Joi
      .string()
      .required()
      .min(11)
      .max(11)
      .messages({
        'any.required': 'O campo cpf é necessário',
        'string.base': 'O campo cpf deve ser do tipo string',
        'string.empty': 'O campo cpf não pode estar vazio',
        'string.min': 'O campo cpf deve conter 11 numeros',
        'string.max': 'O campo cpf deve conter apenas numeros'
      }),
    email: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'O campo email deve ser do tipo string',
        'string.empty': 'O campo email não pode estar vazio',
        'string.min': 'O campo email deve maior que 0'
      }),
    data_nasc: Joi
      .date().format(['YYYY-MM-DD']).max('now').greater('1900-1-1').utc()
      .required()
      .messages({
        'any.required': 'O campo data_nasc é necessário',
        'date.max': 'O campo data_nasc não pode ser maior que a data atual',
        'date.greater': 'O campo data_nasc dever ser maior que 1900-1-1',
        'date.format': 'O campo data_nasc deve estar no formato de YYYY-MM-DD'
      }),
    celular: Joi
      .string()
      .allow(null)
      .min(11)
      .messages({
        'string.base': 'O campo celular deve ser do tipo string',
        'string.empty': 'O campo celular não pode estar vazio',
        'string.min': 'O campo celular deve maior que 11'
      }),
    password: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'O campo celular deve ser do tipo string',
        'string.empty': 'O campo celular não pode estar vazio',
        'string.min': 'O campo celular deve maior que 0'
      })
  }),
  clientDelete: Joi.object().keys({
    id_cliente: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_cliente é necessário',
        'number.base': 'O campo id_cliente deve ser do tipo number',
        'number.empty': 'O campo id_cliente não pode estar vazio',
        'number.min': 'O campo id_cliente deve ser maior que 0'
      })
  })
}

export default validationSchemas
