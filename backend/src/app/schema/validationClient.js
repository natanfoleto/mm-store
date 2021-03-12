const JoiBase = require('joi')
const JoiDate = require('@hapi/joi-date')
const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  clientCreate: Joi.object().keys({
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
    cpf: Joi
      .string()
      .required()
      .min(11)
      .max(11)
      .messages({
        'any.required': 'cpf é necessário',
        'string.base': 'cpf deve ser do tipo string',
        'string.empty': 'cpf não pode estar vazio',
        'string.min': 'cpf deve conter 11 numeros',
        'string.max': 'cpf deve conter apenas numeros'
      }),
    email: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'email deve ser do tipo string',
        'string.empty': 'email não pode estar vazio',
        'string.min': 'email deve maior que 0'
      }),
    data_nasc: Joi 
      .date().format(['YYYY-MM-DD']).max('now').greater('1900-1-1').utc()
      .required()
      .messages({
        'any.required': 'data_nasc é necessário',
        'date.max': 'data_nasc não pode ser maior que a data atual',
        'date.greater': 'data_nasc dever ser maior que 1900-1-1',
        'date.format': 'data_nasc deve estar no formato de YYYY-MM-DD'
      }),
    celular: Joi
      .string()
      .allow(null)
      .min(11)
      .messages({
        'string.base': 'celular deve ser do tipo string',
        'string.empty': 'celular não pode estar vazio',
        'string.min': 'celular deve maior que 11'
      }),
    password: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'password deve ser do tipo string',
        'string.empty': 'password não pode estar vazio',
        'string.min': 'password deve maior que 0'
      }),
  }),
  clientUpdate: Joi.object().keys({
    id_cliente: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_cliente é necessário',
        'number.base': 'id_cliente deve ser do tipo number',
        'number.empty': 'id_cliente não pode estar vazio',
        'number.min': 'id_cliente deve ser maior que 0'
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
    cpf: Joi
      .string()
      .required()
      .min(11)
      .max(11)
      .messages({
        'any.required': 'cpf é necessário',
        'string.base': 'cpf deve ser do tipo string',
        'string.empty': 'cpf não pode estar vazio',
        'string.min': 'cpf deve conter 11 numeros',
        'string.max': 'cpf deve conter apenas numeros'
      }),
    email: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'email deve ser do tipo string',
        'string.empty': 'email não pode estar vazio',
        'string.min': 'email deve maior que 0'
      }),
    data_nasc: Joi 
      .date().format(['YYYY-MM-DD']).max('now').greater('1900-1-1').utc()
      .required()
      .messages({
        'any.required': 'data_nasc é necessário',
        'date.max': 'data_nasc não pode ser maior que a data atual',
        'date.greater': 'data_nasc dever ser maior que 1900-1-1',
        'date.format': 'data_nasc deve estar no formato de YYYY-MM-DD'
      }),
    celular: Joi
      .string()
      .allow(null)
      .min(11)
      .messages({
        'string.base': 'celular deve ser do tipo string',
        'string.empty': 'celular não pode estar vazio',
        'string.min': 'celular deve maior que 11'
      }),
    password: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'celular deve ser do tipo string',
        'string.empty': 'celular não pode estar vazio',
        'string.min': 'celular deve maior que 0'
      }),
  }),
  clientDelete: Joi.object().keys({
    id_cliente: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_cliente é necessário',
        'number.base': 'id_cliente deve ser do tipo number',
        'number.empty': 'id_cliente não pode estar vazio',
        'number.min': 'id_cliente deve ser maior que 0'
      }),
  }),
}

module.exports = validationSchemas
