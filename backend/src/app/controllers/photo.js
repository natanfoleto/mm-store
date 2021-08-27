import Photo from '../models/photo.js'
import pagingData from '../utils/pagingData.js'
import message from '../messages/photo.js'

class PhotoController {
  async search (req, res) {
    try {
      const response = await Photo.searchPhoto()

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
      const { id_produto, nome, path, url } = req.body

      const photo = [id_produto, nome, path, url]

      const response = await Photo.insertPhoto(photo)

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

  async remove (req, res) {
    try {
      const { id_foto } = req.body

      const response = await Photo.deletePhoto(id_foto)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhuma foto encontrado com os parâmetros passados
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

export default new PhotoController()
