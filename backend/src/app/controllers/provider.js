import Provider from '../models/provider.js'
import Address from '../models/address.js'
import Product from '../models/product.js'
import pagingData from '../utils/pagingData.js'
import message from '../messages/provider.js'

class ProviderController {
  async search (req, res) {
    try {
      const { key } = req.body

      const response = await Provider.searchProvider(key || '')

      const pagedData = await pagingData(response, req.params)

      return res.json(pagedData)
    } catch (err) {
      //! Erro Internal Server
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async create (req, res) {
    try {
      const { nome, cpf_cnpj, email, celular, obs } = req.body

      const count = await Provider.selectCountProvider([cpf_cnpj, email])

      if (count) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const { insertId } = await Address.insertAddress()

      const provider = [insertId, nome, cpf_cnpj, email, celular, obs]

      const response = await Provider.insertProvider(provider)

      if (response[0]) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode1.message
        })
      } else {
        //! Erro ao executar query
        return res.json({
          result: 'error',
          message: response
        })
      }
    } catch (err) {
      //! Erro Internal Server
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async update (req, res) {
    try {
      const { nome, cpf_cnpj, email, celular, obs, id_fornecedor } = req.body

      const count = await Provider.selectCountProvider([cpf_cnpj, email])

      if (count && count.id !== Number(id_fornecedor)) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const provider = [nome, cpf_cnpj, email, celular, obs, new Date(), id_fornecedor]

      const response = await Provider.updateProvider(provider)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhum fornecedor encontrado com os parâmetros passados
        if (affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }
        //! Erro ao executar query
        return res.json({
          result: 'error',
          message: response
        })
      }
    } catch (err) {
      //! Erro Internal Server
      return res.json({
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

      if (response[0]) {
        //* Apagar endereço correspondente
        await Address.deleteAddress(response[0].id_endereco)

        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        })
      } else {
        //* Nenhum fornecedor encontrado com os parâmetros passados
        if (!response[0]) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }
        //! Erro ao executar query
        return res.json({
          result: 'error',
          message: response
        })
      }
    } catch (err) {
      //! Internal Server Error
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }
}

export default new ProviderController()
