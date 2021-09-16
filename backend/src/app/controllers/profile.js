import Profile from '../models/profile.js'
import User from '../models/user.js'
import calcOffset from '../utils/offset.js'
import message from '../messages/profile.js'

class ProfileController {
  async search (req, res) {
    try {
      const { key } = req.body
      const { page, limit } = req.params

      const offset = await calcOffset(page, limit)

      const response = await Profile.searchProfile(key, limit, offset)

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
      const { nome } = req.body

      const count = await Profile.selectCountProfile(nome)

      if (count) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const profile = [nome]

      const response = await Profile.insertProfile(profile)

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
      const { nome, id_perfil } = req.body

      const count = await Profile.selectCountProfile(nome)

      if (count && count.id !== Number(id_perfil)) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const profile = [nome, new Date(), id_perfil]

      const response = await Profile.updateProfile(profile)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhum perfil encontrado com os parâmetros passados
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
      const { id_perfil } = req.body

      const users = await User.findUserByProfile([id_perfil])

      //* Existem usuários atrelados a este perfil
      if (users[0]) {
        return res.json({
          result: 'error',
          message: message.error.code1.subcode3.message
        })
      }

      const response = await Profile.deleteProfile(id_perfil)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        })
      } else {
        //* Nenhum perfil encontrado com os parâmetros passados
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

export default new ProfileController()
