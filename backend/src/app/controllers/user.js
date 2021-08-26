import User from '../models/user.js'
import pagingData from '../utils/pagingData.js'
import { encryptPassword } from '../utils/bcrypt.js'
import message from '../messages/user.js'

class UserController {
  async search (req, res) {
    try {
      const { key } = req.body

      const response = await User.searchUser(key || '')

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
      const { id_perfil, nome, login, password } = req.body

      const { count } = await User.selectCountUser(login)

      if (Number(count) > 0) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const password_hash = await encryptPassword(password)

      const user = [id_perfil, nome, login, password_hash]

      const response = await User.insertUser(user)

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
      const { id_perfil, nome, login, id_usuario } = req.body

      const { count } = await User.selectCountUser(login)

      if (Number(count) > 0) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const user = [id_perfil, nome, login, new Date(), id_usuario]

      const response = await User.updateUser(user)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhum usuário encontrado com os parâmetros passados
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
      const { id_usuario } = req.body

      const response = await User.deleteUser(id_usuario)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        })
      } else {
        //* Nenhum usuário encontrado com os parâmetros passados
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
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }
}

export default new UserController()
