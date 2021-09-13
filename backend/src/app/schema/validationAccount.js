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
  })
}

export default validationSchemas
