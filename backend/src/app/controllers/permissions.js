import Permissions from '../models/permissions.js'
import message from '../messages/permissions.js'

class PermissionsController {
  async search (req, res) {
    try {
      const { perfil } = req.params

      const response = await Permissions.searchPermissions([perfil])

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
      const { id_perfil, id_permissao } = req.body

      const permissions = [id_perfil, id_permissao]

      const count = await Permissions.selectCountPermissions(permissions)

      if (count) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const response = await Permissions.insertPermissions(permissions)

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
      const { id_permissao_perfil } = req.body

      const response = await Permissions.deletePermissions(id_permissao_perfil)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhum permissão encontrada com os parâmetros passados
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

export default new PermissionsController()
