import JoiBase from 'joi'
import JoiDate from '@hapi/joi-date'

const Joi = JoiBase.extend(JoiDate)

const validationSchemas = {
  productCreate: Joi.object().keys({
    id_categoria: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_categoria é necessário',
        'number.base': 'id_categoria deve ser do tipo number',
        'number.empty': 'id_categoria não pode estar vazio',
        'number.min': 'id_categoria deve ser maior que 0'
      }),
    id_fornecedor: Joi
      .number()
      .allow(null)
      .min(1)
      .messages({
        'number.base': 'id_fornecedor deve ser do tipo number',
        'number.empty': 'id_fornecedor não pode estar vazio',
        'number.min': 'id_fornecedor deve ser maior que 0'
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
      }),
    preco_custo: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'preco_custo é necessário',
        'number.base': 'preco_custo deve ser do tipo number',
        'number.empty': 'preco_custo não pode estar vazio',
        'number.min': 'preco_custo deve maior que 0'
      }),
    preco_venda: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'preco_venda é necessário',
        'number.base': 'preco_venda deve ser do tipo number',
        'number.empty': 'preco_venda não pode estar vazio',
        'number.min': 'preco_venda deve maior que 0'
      }),
    preco_promocional: Joi
      .number()
      .allow(null)
      .min(0)
      .messages({
        'number.base': 'preco_promocional deve ser do tipo number',
        'number.empty': 'preco_promocional não pode estar vazio',
        'number.min': 'preco_promocional deve maior que 0'
      }),
    estoque: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'estoque é necessário',
        'number.base': 'estoque deve ser do tipo number',
        'number.empty': 'estoque não pode estar vazio',
        'number.min': 'estoque deve maior que 0'
      }),
    tamanho: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'tamanho deve ser do tipo string',
        'string.empty': 'tamanho não pode estar vazio',
        'string.min': 'tamanho deve maior que 0'
      })
  }),
  productUpdate: Joi.object().keys({
    id_produto: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_produto é necessário',
        'number.base': 'id_produto deve ser do tipo number',
        'number.empty': 'id_produto não pode estar vazio',
        'number.min': 'id_produto deve ser maior que 0'
      }),
    id_categoria: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_categoria é necessário',
        'number.base': 'id_categoria deve ser do tipo number',
        'number.empty': 'id_categoria não pode estar vazio',
        'number.min': 'id_categoria deve ser maior que 0'
      }),
    id_fornecedor: Joi
      .number()
      .allow(null)
      .min(1)
      .messages({
        'number.base': 'id_fornecedor deve ser do tipo number',
        'number.empty': 'id_fornecedor não pode estar vazio',
        'number.min': 'id_fornecedor deve ser maior que 0'
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
      }),
    preco_custo: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'preco_custo é necessário',
        'number.base': 'preco_custo deve ser do tipo number',
        'number.empty': 'preco_custo não pode estar vazio',
        'number.min': 'preco_custo deve maior que 0'
      }),
    preco_venda: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'preco_venda é necessário',
        'number.base': 'preco_venda deve ser do tipo number',
        'number.empty': 'preco_venda não pode estar vazio',
        'number.min': 'preco_venda deve maior que 0'
      }),
    preco_promocional: Joi
      .number()
      .allow(null)
      .min(0)
      .messages({
        'number.base': 'preco_promocional deve ser do tipo number',
        'number.empty': 'preco_promocional não pode estar vazio',
        'number.min': 'preco_promocional deve maior que 0'
      }),
    estoque: Joi
      .number()
      .required()
      .min(0)
      .messages({
        'any.required': 'estoque é necessário',
        'number.base': 'estoque deve ser do tipo number',
        'number.empty': 'estoque não pode estar vazio',
        'number.min': 'estoque deve maior que 0'
      }),
    tamanho: Joi
      .string()
      .allow(null)
      .messages({
        'string.base': 'tamanho deve ser do tipo string',
        'string.empty': 'tamanho não pode estar vazio',
        'string.min': 'tamanho deve maior que 0'
      })
  }),
  productDelete: Joi.object().keys({
    id_produto: Joi
      .number()
      .required()
      .min(1)
      .messages({
        'any.required': 'id_produto é necessário',
        'number.base': 'id_produto deve ser do tipo number',
        'number.empty': 'id_produto não pode estar vazio',
        'number.min': 'id_produto deve ser maior que 0'
      })
  })
}

export default validationSchemas
