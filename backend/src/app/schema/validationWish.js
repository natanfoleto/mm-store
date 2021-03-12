const JoiBase = require('joi')
const JoiDate = require('@hapi/joi-date')
const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  wishCreate: Joi.object().keys({
    id_cliente: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_cliente é necessário',
        'number.base': 'id_cliente deve ser um número',
        'number.empty': 'id_cliente não pode estar vazio',
        'number.min': 'id_cliente deve ser maior que 0'
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
    url_foto: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'url_foto deve ser do tipo string',
        'string.empty': 'url_foto não pode estar vazio',
      })
  }),
  wishUpdate: Joi.object().keys({
    id_pedido: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_pedido é necessário',
        'number.base': 'id_pedido deve ser um número',
        'number.empty': 'id_pedido não pode estar vazio',
        'number.min': 'id_pedido deve ser maior que 0'
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
    url_foto: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'url_foto deve ser do tipo string',
        'string.empty': 'url_foto não pode estar vazio',
      })
  }),
  wishDelete: Joi.object().keys({
    id_pedido: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_pedido é necessário',
        'number.base': 'id_pedido deve ser um número',
        'number.empty': 'id_pedido não pode estar vazio',
        'number.min': 'id_pedido deve ser maior que 0'
      }),
  }),
}

module.exports = validationSchemas
