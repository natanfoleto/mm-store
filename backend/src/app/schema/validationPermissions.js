import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  permissionsSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  permissionsCreate: Joi.object().keys({
    id_perfil: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_perfil é necessário',
        'number.base': 'O campo id_perfil deve ser um número',
        'number.empty': 'O campo id_perfil não pode estar vazio',
        'number.min': 'O campo id_perfil deve ser maior que 0'
      }),
    id_permissao: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_permissao é necessário',
        'number.base': 'O campo id_permissao deve ser um número',
        'number.empty': 'O campo id_permissao não pode estar vazio',
        'number.min': 'O campo id_permissao deve ser maior que 0'
      })
  }),
  permissionsDelete: Joi.object().keys({
    id_permissao_perfil: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_permissao_perfil é necessário',
        'number.base': 'O campo id_permissao_perfil deve ser um número',
        'number.empty': 'O campo id_permissao_perfil não pode estar vazio',
        'number.min': 'O campo id_permissao_perfil deve ser maior que 0'
      })
  })
}

export default validationSchemas
