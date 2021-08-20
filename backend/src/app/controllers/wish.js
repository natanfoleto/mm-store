import Wish from '../models/wish.js'
import message from '../messages/wish.js'

import SQL from '../../lib/SQL.js'

class WishController {
  async list (req, res) {
    try {
      const response = await Wish.listWish()

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

      const wish = {
        id_cliente: body.id_cliente,
        descricao: body.descricao,
        url_foto: body.url_foto || null
      }

      const response = await Wish.insertWish(wish)

      const sqlTreated = await SQL(response)

      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        return res.json(sqlTreated)
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

      const wish = {
        descricao: body.descricao,
        url_foto: body.url_foto || null,
        id_pedido: body.id_pedido
      }

      const response = await Wish.updateWish(wish)

      const sqlTreated = await SQL(response)

      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        return res.json(sqlTreated)
      }

      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
        //* Nenhum pedido encontrado com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode1.message
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
      const { id_pedido } = req.body

      const response = await Wish.deleteWish(id_pedido)

      const sqlTreated = await SQL(response)

      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        return res.json(sqlTreated)
      }

      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
        //* Nenhum pedido encontrado com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode1.message
          })
        }

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

export default new WishController()
