import Provider from '../models/provider.js'
import Address from '../models/address.js'
import Product from '../models/product.js'
import message from '../messages/provider.js'

import SQL from '../../lib/SQL.js'

class ProviderController {
  async list (req, res) {
    try {
      const response = await Provider.listProvider()

      return res.json(response)
    } catch (err) {
      //! Erro Internal Server
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async create (req, res) {
    try {
      const body = req.body

      const address = await Address.insertAddress()

      const provider = {
        id_endereco: address.insertId || null,
        nome: body.nome,
        cpf_cnpj: body.cpf_cnpj,
        email: body.email || null,
        celular: body.celular || null,
        obs: body.obs || null
      }

      const response = await Provider.insertProvider(provider)

      const sqlTreated = await SQL(response)

      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        //! Erro de cadastro duplicado
        if (sqlTreated.errno === 1062) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode1.message
          })
        }
      }

      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
        return res.json({
          result: 'success',
          message: message.success.code1.subcode1.message
        })
      }

      return res.json(sqlTreated)
    } catch (err) {
      //! Erro Internal Server
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async update (req, res) {
    try {
      const body = req.body

      const provider = {
        nome: body.nome,
        cpf_cnpj: body.cpf_cnpj,
        email: body.email || null,
        celular: body.celular || null,
        obs: body.obs || null,
        updated_at: new Date(),
        id_fornecedor: body.id_fornecedor
      }

      const response = await Provider.updateProvider(provider)

      const sqlTreated = await SQL(response)

      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        //! Erro de cadastro duplicado
        if (sqlTreated.errno === 1062) {
          return res.json({
            result: sqlTreated.result,
            message: message.error.code1.subcode1.message
          })
        }
      }

      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
        //* Nenhum usuário encontrado com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }

        return res.json({
          result: sqlTreated.result,
          message: message.success.code1.subcode2.message
        })
      }

      return res.json(sqlTreated)
    } catch (err) {
      //! Erro Internal Server
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async remove (req, res) {
    try {
      const { id_fornecedor } = req.body

      const products = await Product.findProductByProvider(id_fornecedor)

      //* Existem produtos atrelados a este fornecedor
      if (products[0]) {
        return res.json({
          result: 'error',
          message: message.error.code1.subcode3.message
        })
      }

      const response = await Provider.deleteProvider(id_fornecedor)

      const sqlTreated = await SQL(response)

      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        return res.json(sqlTreated)
      }

      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
        //* Nenhum usuário encontrado com os parâmetros passados
        if (!response[0]) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }

        await Address.deleteAddress(response[0].id_endereco)

        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        })
      }

      return res.json(sqlTreated)
    } catch (err) {
      //! Internal Server Error
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }
}

export default new ProviderController()
