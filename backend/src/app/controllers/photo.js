import Photo from '../models/photo.js'
import message from '../messages/photo.js'

import SQL from '../helper/SQL.js'

class PhotoController {
  async list (req, res) {
    try {
      const response = await Photo.listPhoto()

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

      const photo = {
        id_produto: body.id_produto,
        nome: body.nome || null,
        path: body.path,
        url: body.url
      }

      const response = await Photo.insertPhoto(photo)

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

  async remove (req, res) {
    try {
      const { id_foto } = req.body

      const response = await Photo.deletePhoto(id_foto)

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
          message: message.success.code1.subcode2.message
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

export default new PhotoController()
