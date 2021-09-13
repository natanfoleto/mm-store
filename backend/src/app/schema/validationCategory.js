import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  categorySearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  categoryCreate: Joi.object().keys({
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
  categoryUpdate: Joi.object().keys({
    id_categoria: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_categoria é necessário',
        'number.base': 'O campo id_categoria deve ser um número',
        'number.empty': 'O campo id_categoria não pode estar vazio',
        'number.min': 'O campo id_categoria deve ser maior que 0'
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
      })
  }),
  categoryDelete: Joi.object().keys({
    id_categoria: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_categoria é necessário',
        'number.base': 'O campo id_categoria deve ser um número',
        'number.empty': 'O campo id_categoria não pode estar vazio',
        'number.min': 'O campo id_categoria deve ser maior que 0'
      })
  })
}

export default validationSchemas
