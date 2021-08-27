import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  accountSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'parâmetro key é necessário',
        'string.base': 'key deve ser do tipo string'
      })
  })
}

export default validationSchemas
