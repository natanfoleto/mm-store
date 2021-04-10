import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  addressCreate: Joi.object().keys({
    id_pessoa: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_pessoa é necessário',
        'number.base': 'id_pessoa deve ser um número',
        'number.empty': 'id_pessoa não pode estar vazio',
        'number.min': 'id_pessoa deve ser maior que 0'
      }),
    tipo_pessoa: Joi
      .string()
      .required()
      .messages({
        'any.required': 'tipo_pessoa é necessário',
        'string.base': 'tipo_pessoa deve ser do tipo string',
        'string.empty': 'tipo_pessoa não pode estar vazio',
      }),
    logradouro: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'logradouro é necessário',
        'string.base': 'logradouro deve ser do tipo string',
        'string.empty': 'logradouro não pode estar vazio',
        'string.min': 'logradouro deve ter mais de 4 caracteres'
      }),
    numero: Joi
      .string()
      .required()
      .min(1)
      .messages({
        'any.required': 'numero é necessário',
        'string.base': 'numero deve ser do tipo string',
        'string.empty': 'numero não pode estar vazio',
        'string.min': 'numero deve maior que 1'
      }),
    cep: Joi
      .string()
      .allow(null)
      .min(8)
      .messages({
        'string.base': 'cep deve ser do tipo string',
        'string.empty': 'cep não pode estar vazio',
        'string.min': 'cep deve maior que 0'
      }),
    bairro: Joi
      .string()
      .allow(null)
      .min(4)
      .messages({
        'string.base': 'bairro deve ser do tipo string',
        'string.empty': 'bairro não pode estar vazio',
        'string.min': 'bairro deve maior que 4'
      }),
    cidade: Joi
      .string()
      .allow(null)
      .min(4)
      .messages({
        'string.base': 'cidade deve ser do tipo string',
        'string.empty': 'cidade não pode estar vazio',
        'string.min': 'cidade deve maior que 4'
      }),
    uf: Joi
      .string()
      .allow(null)
      .min(2)
      .max(2)
      .messages({
        'string.base': 'uf deve ser do tipo string',
        'string.empty': 'uf não pode estar vazio',
        'string.min': 'uf deve ter apenas duas letras',
        'string.max': 'uf deve ter apenas duas letras'
      }),
    latitude: Joi
      .number()
      .allow(null)
      .messages({
        'number.base': 'latitude deve ser do tipo number',
        'number.empty': 'latitude não pode estar vazio',
      }),
    longitude: Joi
      .number()
      .allow(null)
      .messages({
        'number.base': 'latitude deve ser do tipo number',
        'number.empty': 'latitude não pode estar vazio',
      }),
  }),
  addressUpdate: Joi.object().keys({
    id_endereco: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_endereco é necessário',
        'number.base': 'id_endereco deve ser um número',
        'number.empty': 'id_endereco não pode estar vazio',
        'number.min': 'id_endereco deve ser maior que 0'
      }),
    logradouro: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'logradouro é necessário',
        'string.base': 'logradouro deve ser do tipo string',
        'string.empty': 'logradouro não pode estar vazio',
        'string.min': 'logradouro deve ter mais de 4 caracteres'
      }),
    numero: Joi
      .string()
      .required()
      .min(1)
      .messages({
        'any.required': 'numero é necessário',
        'string.base': 'numero deve ser do tipo string',
        'string.empty': 'numero não pode estar vazio',
        'string.min': 'numero deve maior que 1'
      }),
    cep: Joi
      .string()
      .allow(null)
      .min(8)
      .messages({
        'string.base': 'cep deve ser do tipo string',
        'string.empty': 'cep não pode estar vazio',
        'string.min': 'cep deve maior que 0'
      }),
    bairro: Joi
      .string()
      .allow(null)
      .min(4)
      .messages({
        'string.base': 'bairro deve ser do tipo string',
        'string.empty': 'bairro não pode estar vazio',
        'string.min': 'bairro deve maior que 4'
      }),
    cidade: Joi
      .string()
      .allow(null)
      .min(4)
      .messages({
        'string.base': 'cidade deve ser do tipo string',
        'string.empty': 'cidade não pode estar vazio',
        'string.min': 'cidade deve maior que 4'
      }),
    uf: Joi
      .string()
      .allow(null)
      .min(2)
      .max(2)
      .messages({
        'string.base': 'uf deve ser do tipo string',
        'string.empty': 'uf não pode estar vazio',
        'string.min': 'uf deve ter apenas duas letras',
        'string.max': 'uf deve ter apenas duas letras'
      }),
    latitude: Joi
      .number()
      .allow(null)
      .messages({
        'number.base': 'latitude deve ser do tipo number',
        'number.empty': 'latitude não pode estar vazio',
      }),
    longitude: Joi
      .number()
      .allow(null)
      .messages({
        'number.base': 'latitude deve ser do tipo number',
        'number.empty': 'latitude não pode estar vazio',
      }),
  }),
  addressDelete: Joi.object().keys({
    id_endereco: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_endereco é necessário',
        'number.base': 'id_endereco deve ser um número',
        'number.empty': 'id_endereco não pode estar vazio',
        'number.min': 'id_endereco deve ser maior que 0'
      }),
  }),
}

export default validationSchemas
