import Permission from '../models/permission.js'
import calcOffset from '../utils/offset.js'
import message from '../messages/permission.js'

function isEmpty (str) {
  return (!str || str.length === 0)
}

class PermissionController {
  async search (req, res) {
    try {
      const { key } = req.body
      const { page, limit } = req.params

      const offset = await calcOffset(page, limit)

      const response = await Permission.searchPermission(key, limit, offset)

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

  async searchForProfile (req, res) {
    try {
      let params

      const { tipo, contexto, id_perfil } = req.body

      if (!isEmpty(tipo) && !isEmpty(contexto)) {
        params = { tipo: tipo, contexto: contexto, id_perfil: id_perfil }
      } else if (!isEmpty(tipo) && isEmpty(contexto)) {
        params = { tipo: tipo, id_perfil: id_perfil }
      } else if (isEmpty(tipo) && !isEmpty(contexto)) {
        params = { contexto: contexto, id_perfil: id_perfil }
      } else {
        params = { id_perfil: id_perfil }
      }

      const response = await Permission.searchPermissionForProfile(params)

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
      const { nome, tipo, descricao, contexto } = req.body

      const count = await Permission.selectCountPermission(nome)

      if (count) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const permission = [nome, tipo, descricao, contexto]

      const response = await Permission.insertPermission(permission)

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
      const { nome, tipo, descricao, contexto, id_permissao } = req.body

      const count = await Permission.selectCountPermission(nome)

      if (count && count.id !== Number(id_permissao)) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const permission = [nome, tipo, descricao, contexto || null, id_permissao]

      const response = await Permission.updatePermission(permission)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhuma permissão encontrado com os parâmetros passados
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
      const { id_permissao } = req.body

      const response = await Permission.deletePermission(id_permissao)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        })
      } else {
        //* Nenhuma permissão encontrado com os parâmetros passados
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
      //! Internal Server Error
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }
}

export default new PermissionController()
