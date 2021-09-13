import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  productSearch: Joi.object().keys({
    key: Joi
      .string()
      .allow('')
      .messages({
        'any.required': 'Parâmetro key é necessário',
        'string.base': 'Key deve ser do tipo string'
      })
  }),
  productCreate: Joi.object().keys({
    id_categoria: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_categoria é necessário',
        'number.base': 'O campo id_categoria deve ser do tipo number',
        'number.empty': 'O campo id_categoria não pode estar vazio',
        'number.min': 'O campo id_categoria deve ser maior que 0'
      }),
    id_fornecedor: Joi
      .number()
      .allow(null)
      .min(1)
      .messages({
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
    preco_custo: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'O campo preco_custo é necessário',
        'number.base': 'O campo preco_custo deve ser do tipo number',
        'number.empty': 'O campo preco_custo não pode estar vazio',
        'number.min': 'O campo preco_custo deve ser maior que 0'
      }),
    preco_venda: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'O campo preco_venda é necessário',
        'number.base': 'O campo preco_venda deve ser do tipo number',
        'number.empty': 'O campo preco_venda não pode estar vazio',
        'number.min': 'O campo preco_venda deve ser maior que 0'
      }),
    estoque: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'O campo estoque é necessário',
        'number.base': 'O campo estoque deve ser do tipo number',
        'number.empty': 'O campo estoque não pode estar vazio',
        'number.min': 'O campo estoque deve ser maior que 0'
      }),
    tamanho: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'O campo tamanho deve ser do tipo string',
        'string.empty': 'O campo tamanho não pode estar vazio',
        'string.min': 'O campo tamanho deve ser maior que 0'
      })
  }),
  productUpdate: Joi.object().keys({
    id_produto: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_produto é necessário',
        'number.base': 'O campo id_produto deve ser do tipo number',
        'number.empty': 'O campo id_produto não pode estar vazio',
        'number.min': 'O campo id_produto deve ser maior que 0'
      }),
    id_categoria: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_categoria é necessário',
        'number.base': 'O campo id_categoria deve ser do tipo number',
        'number.empty': 'O campo id_categoria não pode estar vazio',
        'number.min': 'O campo id_categoria deve ser maior que 0'
      }),
    id_fornecedor: Joi
      .number()
      .allow(null)
      .min(1)
      .messages({
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
    preco_custo: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'O campo preco_custo é necessário',
        'number.base': 'O campo preco_custo deve ser do tipo number',
        'number.empty': 'O campo preco_custo não pode estar vazio',
        'number.min': 'O campo preco_custo deve ser maior que 0'
      }),
    preco_venda: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'O campo preco_venda é necessário',
        'number.base': 'O campo preco_venda deve ser do tipo number',
        'number.empty': 'O campo preco_venda não pode estar vazio',
        'number.min': 'O campo preco_venda deve ser maior que 0'
      }),
    estoque: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'O campo estoque é necessário',
        'number.base': 'O campo estoque deve ser do tipo number',
        'number.empty': 'O campo estoque não pode estar vazio',
        'number.min': 'O campo estoque deve ser maior que 0'
      }),
    tamanho: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'O campo tamanho deve ser do tipo string',
        'string.empty': 'O campo tamanho não pode estar vazio',
        'string.min': 'O campo tamanho deve ser maior que 0'
      })
  }),
  productDelete: Joi.object().keys({
    id_produto: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'O campo id_produto é necessário',
        'number.base': 'O campo id_produto deve ser do tipo number',
        'number.empty': 'O campo id_produto não pode estar vazio',
        'number.min': 'O campo id_produto deve ser maior que 0'
      })
  })
}

export default validationSchemas
