const JoiBase = require('joi')
const JoiDate = require('@hapi/joi-date')
const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  providerCreate: Joi.object().keys({
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
    cpf_cnpj: Joi
      .string()
      .required()
      .min(0)
      .messages({
        'any.required': 'cpf_cnpj é necessário',
        'string.base': 'cpf_cnpj deve ser do tipo string',
        'string.empty': 'cpf_cnpj não pode estar vazio',
        'string.min': 'cpf_cnpj deve maior que 0'
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
    celular: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'celular deve ser do tipo string',
        'string.empty': 'celular não pode estar vazio',
        'string.min': 'celular deve maior que 0'
      }),
    obs: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'obs deve ser do tipo string',
        'string.empty': 'obs não pode estar vazio',
        'string.min': 'obs deve maior que 0'
      }),
  }),
  providerUpdate: Joi.object().keys({
    id_fornecedor: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_fornecedor é necessário',
        'number.base': 'id_fornecedor deve ser do tipo number',
        'number.empty': 'id_fornecedor não pode estar vazio',
        'number.min': 'id_fornecedor deve ser maior que 0'
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
    cpf_cnpj: Joi
      .string()
      .required()
      .min(0)
      .messages({
        'any.required': 'cpf_cnpj é necessário',
        'string.base': 'cpf_cnpj deve ser do tipo string',
        'string.empty': 'cpf_cnpj não pode estar vazio',
        'string.min': 'cpf_cnpj deve maior que 0'
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
    celular: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'celular deve ser do tipo string',
        'string.empty': 'celular não pode estar vazio',
        'string.min': 'celular deve maior que 0'
      }),
    obs: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'obs deve ser do tipo string',
        'string.empty': 'obs não pode estar vazio',
        'string.min': 'obs deve maior que 0'
      }),
  }),
  providerDelete: Joi.object().keys({
    id_fornecedor: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_fornecedor é necessário',
        'number.base': 'id_fornecedor deve ser do tipo number',
        'number.empty': 'id_fornecedor não pode estar vazio',
        'number.min': 'id_fornecedor deve ser maior que 0'
      }),
  }),
}

module.exports = validationSchemas
