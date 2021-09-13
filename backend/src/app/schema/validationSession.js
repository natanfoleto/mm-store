import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  sessionCreate: Joi.object().keys({
    login: Joi
      .string()
      .required()
      .messages({
        'any.required': 'O campo login é necessário',
        'string.base': 'O campo login deve ser do tipo string',
        'string.empty': 'O campo login não pode estar vazio'
      }),
    password: Joi
      .string()
      .required()
      .messages({
        'any.required': 'O campo password é necessário',
        'string.base': 'O campo password deve ser do tipo string',
        'string.empty': 'O campo password não pode estar vazio'
      })
  })
}

export default validationSchemas
