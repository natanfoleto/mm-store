import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  addressSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  addressUpdate: Joi.object().keys({
    id_endereco: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_endereco é necessário',
        'number.base': 'O campo id_endereco deve ser um número',
        'number.empty': 'O campo id_endereco não pode estar vazio',
        'number.min': 'O campo id_endereco deve ser maior que 0'
      }),
    logradouro: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'O campo logradouro é necessário',
        'string.base': 'O campo logradouro deve ser do tipo string',
        'string.empty': 'O campo logradouro não pode estar vazio',
        'string.min': 'O campo logradouro deve ter mais de 4 caracteres'
      }),
    numero: Joi
      .string()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo numero é necessário',
        'string.base': 'O campo numero deve ser do tipo string',
        'string.empty': 'O campo numero não pode estar vazio',
        'string.min': 'O campo numero deve maior que 1'
      }),
    cep: Joi
      .string()
      .allow(null)
      .min(8)
      .messages({
        'string.base': 'O campo cep deve ser do tipo string',
        'string.empty': 'O campo cep não pode estar vazio',
        'string.min': 'O campo cep deve maior que 0'
      }),
    bairro: Joi
      .string()
      .allow(null)
      .min(4)
      .messages({
        'string.base': 'O campo bairro deve ser do tipo string',
        'string.empty': 'O campo bairro não pode estar vazio',
        'string.min': 'O campo bairro deve maior que 4'
      }),
    cidade: Joi
      .string()
      .allow(null)
      .min(4)
      .messages({
        'string.base': 'O campo cidade deve ser do tipo string',
        'string.empty': 'O campo cidade não pode estar vazio',
        'string.min': 'O campo cidade deve maior que 4'
      }),
    uf: Joi
      .string()
      .allow(null)
      .min(2)
      .max(2)
      .messages({
        'string.base': 'O campo uf deve ser do tipo string',
        'string.empty': 'O campo uf não pode estar vazio',
        'string.min': 'O campo uf deve ter apenas duas letras',
        'string.max': 'O campo uf deve ter apenas duas letras'
      }),
    latitude: Joi
      .number()
      .allow(null)
      .messages({
        'number.base': 'O campo latitude deve ser do tipo number',
        'number.empty': 'O campo latitude não pode estar vazio'
      }),
    longitude: Joi
      .number()
      .allow(null)
      .messages({
        'number.base': 'O campo latitude deve ser do tipo number',
        'number.empty': 'O campo latitude não pode estar vazio'
      })
  }),
  addressDelete: Joi.object().keys({
    id_endereco: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_endereco é necessário',
        'number.base': 'O campo id_endereco deve ser um número',
        'number.empty': 'O campo id_endereco não pode estar vazio',
        'number.min': 'O campo id_endereco deve ser maior que 0'
      })
  })
}

export default validationSchemas
