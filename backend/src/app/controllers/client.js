import Client from '../models/client.js'
import Address from '../models/address.js'
import Account from '../models/account.js'
import pagingData from '../utils/pagingData.js'
import { encryptPassword } from '../utils/bcrypt.js'
import message from '../messages/client.js'

class ClientController {
  async search (req, res) {
    try {
      const { key } = req.body

      const response = await Client.searchClient(key || '')

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
      const { nome, cpf, email, data_nasc, celular, password } = req.body

      const { count } = await Client.selectCountClient([cpf, email])

      if (Number(count) > 0) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const { insertId } = await Address.insertAddress()

      const password_hash = await encryptPassword(password)

      const client = [insertId, nome, cpf, email, data_nasc, celular, password_hash]

      const response = await Client.insertClient(client)

      if (response[0]) {
        //* Query executada com sucesso
        // TODO Criar conta e vincular com cliente

        await Account.insertAccount(response[0].id_cliente)

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
      const { nome, cpf, email, data_nasc, celular, password, id_cliente } = req.body

      const { count } = await Client.selectCountClient([cpf, email])

      if (Number(count) > 0) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const password_hash = await encryptPassword(password)

      const client = [nome, cpf, email, data_nasc, celular, password_hash, new Date(), id_cliente]

      const response = await Client.updateClient(client)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhum cliente encontrado com os parâmetros passados
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
      const { id_cliente } = req.body

      const response = await Client.deleteClient(id_cliente)

      if (response[0]) {
        //* Apagar endereço correspondente
        await Address.deleteAddress(response[0].id_endereco)

        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        })
      } else {
        //* Nenhum cliente encontrado com os parâmetros passados
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

export default new ClientController()
