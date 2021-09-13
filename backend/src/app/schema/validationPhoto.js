import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  photoSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  photoCreate: Joi.object().keys({
    id_produto: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_produto é necessário',
        'number.base': 'O campo id_produto deve ser um número',
        'number.empty': 'O campo id_produto não pode estar vazio',
        'number.min': 'O campo id_produto deve ser maior que 0'
      }),
    nome: Joi
      .string()
      .allow(null)
      .min(4)
      .messages({
        'string.base': 'O campo nome deve ser do tipo string',
        'string.empty': 'O campo nome não pode estar vazio',
        'string.min': 'O campo nome deve ter mais de 4 caracteres'
      }),
    path: Joi
      .string()
      .required()
      .messages({
        'any.required': 'O campo path é necessário',
        'string.base': 'O campo path deve ser do tipo string',
        'string.empty': 'O campo path não pode estar vazio'
      }),
    url: Joi
      .string()
      .required()
      .messages({
        'any.required': 'O campo url é necessário',
        'string.base': 'O campo url deve ser do tipo string',
        'string.empty': 'O campo url não pode estar vazio'
      })
  }),
  photoDelete: Joi.object().keys({
    id_foto: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_foto é necessário',
        'number.base': 'O campo id_foto deve ser um número',
        'number.empty': 'O campo id_foto não pode estar vazio',
        'number.min': 'O campo id_foto deve ser maior que 0'
      })
  })
}

export default validationSchemas
