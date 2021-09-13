import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  providerSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  providerCreate: Joi.object().keys({
    nome: Joi
      .string()
      .required()
      .min(4)
      .messages({
        'any.required': 'O campo nome é necessário',
        'string.base': 'O campo nome deve ser do tipo string',
        'string.empty': 'O campo nome não pode estar vazio',
        'string.min': 'O campo nome deve ter mais de 4 caracteres'
      }),
    cpf_cnpj: Joi
      .string()
      .required()
      .min(0)
      .messages({
        'any.required': 'O campo cpf_cnpj é necessário',
        'string.base': 'O campo cpf_cnpj deve ser do tipo string',
        'string.empty': 'O campo cpf_cnpj não pode estar vazio',
        'string.min': 'O campo cpf_cnpj deve maior que 0'
      }),
    email: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'O campo email deve ser do tipo string',
        'string.empty': 'O campo email não pode estar vazio',
        'string.min': 'O campo email deve maior que 0'
      }),
    celular: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'O campo celular deve ser do tipo string',
        'string.empty': 'O campo celular não pode estar vazio',
        'string.min': 'O campo celular deve maior que 0'
      }),
    obs: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'O campo obs deve ser do tipo string',
        'string.empty': 'O campo obs não pode estar vazio',
        'string.min': 'O campo obs deve maior que 0'
      })
  }),
  providerUpdate: Joi.object().keys({
    id_fornecedor: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_fornecedor é necessário',
        'number.base': 'O campo id_fornecedor deve ser do tipo number',
        'number.empty': 'O campo id_fornecedor não pode estar vazio',
        'number.min': 'O campo id_fornecedor deve ser maior que 0'
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
      }),
    cpf_cnpj: Joi
      .string()
      .required()
      .min(0)
      .messages({
        'any.required': 'O campo cpf_cnpj é necessário',
        'string.base': 'O campo cpf_cnpj deve ser do tipo string',
        'string.empty': 'O campo cpf_cnpj não pode estar vazio',
        'string.min': 'O campo cpf_cnpj deve maior que 0'
      }),
    email: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'O campo email deve ser do tipo string',
        'string.empty': 'O campo email não pode estar vazio',
        'string.min': 'O campo email deve maior que 0'
      }),
    celular: Joi
      .string()
      .allow(null)
      .min(0)
      .messages({
        'string.base': 'O campo celular deve ser do tipo string',
        'string.empty': 'O campo celular não pode estar vazio',
        'string.min': 'O campo celular deve maior que 0'
      }),
    obs: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'O campo obs deve ser do tipo string',
        'string.empty': 'O campo obs não pode estar vazio',
        'string.min': 'O campo obs deve maior que 0'
      })
  }),
  providerDelete: Joi.object().keys({
    id_fornecedor: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_fornecedor é necessário',
        'number.base': 'O campo id_fornecedor deve ser do tipo number',
        'number.empty': 'O campo id_fornecedor não pode estar vazio',
        'number.min': 'O campo id_fornecedor deve ser maior que 0'
      })
  })
}

export default validationSchemas
