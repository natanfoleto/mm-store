import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  categoryCreate: Joi.object().keys({
    nome: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'nome é necessário',
        'string.base': 'nome deve ser do tipo string',
        'string.empty': 'nome não pode estar vazio',
        'string.min': 'nome deve ter mais de 4 caracteres'
      })
  }),
  categoryUpdate: Joi.object().keys({
    id_categoria: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_categoria é necessário',
        'number.base': 'id_categoria deve ser um número',
        'number.empty': 'id_categoria não pode estar vazio',
        'number.min': 'id_categoria deve ser maior que 0'
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
      })
  }),
  categoryDelete: Joi.object().keys({
    id_categoria: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_categoria é necessário',
        'number.base': 'id_categoria deve ser um número',
        'number.empty': 'id_categoria não pode estar vazio',
        'number.min': 'id_categoria deve ser maior que 0'
      }),
  }),
}

export default validationSchemas
