import Wish from '../models/wish.js'
import calcOffset from '../utils/offset.js'
import message from '../messages/wish.js'

class WishController {
  async search (req, res) {
    try {
      const { key } = req.body
      const { page, limit } = req.params

      const offset = await calcOffset(page, limit)

      const response = await Wish.searchWish(key, limit, offset)

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

  async searchByClient (req, res) {
    try {
      const { id_cliente } = req.body

      const response = await Wish.searchWishByClient(id_cliente)

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

  async create (req, res) {
    try {
      const { id_cliente, descricao, url_foto } = req.body

      const wish = [id_cliente, descricao, url_foto]

      const response = await Wish.insertWish(wish)

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
      const { descricao, url_foto, id_pedido } = req.body

      const wish = [descricao, url_foto, id_pedido]

      const response = await Wish.updateWish(wish)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhum pedido encontrado com os parâmetros passados
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

  async remove (req, res) {
    try {
      const { id_pedido } = req.body

      const response = await Wish.deleteWish(id_pedido)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        })
      } else {
        //* Nenhum pedido encontrado com os parâmetros passados
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
      //! Internal Server Error
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }
}

export default new WishController()
