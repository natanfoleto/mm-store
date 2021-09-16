import Address from '../models/address.js'
import calcOffset from '../utils/offset.js'
import message from '../messages/address.js'

class AddressController {
  async search (req, res) {
    try {
      const { key } = req.body
      const { page, limit } = req.params

      const offset = await calcOffset(page, limit)

      const response = await Address.searchAddress(key, limit, offset)

      return res.json(response)
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
      const { logradouro, numero, cep, bairro, cidade, uf, latitude, longitude, id_endereco } = req.body

      const address = [logradouro, numero, cep, bairro, cidade, uf, latitude, longitude, id_endereco]

      const response = await Address.updateAddress(address)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhum endereço encontrado com os parâmetros passados
        if (affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode1.message
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
}

export default new AddressController()
