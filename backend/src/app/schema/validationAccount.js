import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  accountSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  accountSearchOne: Joi.object().keys({
    id_cliente: Joi
      .number()
      .allow('')
      .messages({
        'any.required': 'Parâmetro id_cliente é necessário',
        'number.base': 'Parâmetro id_cliente deve ser do tipo number'
      })
  })
}

export default validationSchemas
