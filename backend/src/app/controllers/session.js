import jwt from 'jsonwebtoken'
import Session from '../models/session.js'
import Audit from '../models/audit.js'
import { checkPassword } from '../utils/bcrypt.js'
import message from '../messages/session.js'
import env from '../../lib/configLoader.js'

class SessionController {
  async create (req, res) {
    const { login, password } = req.body

    const response = await Session.findUser(login)

    //* Nenhum usuário encontrado com os parâmetros passados
    if (!response[0]) {
      return res.json({
        result: 'error',
        message: message.error.code1.subcode3.message
      })
    }

    const { id_usuario, id_perfil, nome, password_hash } = response[0]

    //* Comparar senha passada com a senha atual do usuário
    if (!(await checkPassword(password, password_hash))) {
      return res.json({
        result: 'error',
        message: message.error.code1.subcode3.message
      })
    }

    req.body.password = '*'

    const audit = {
      login,
      route: req.originalUrl,
      method: req.method,
      body: req.body,
      moment: new Date()
    }

    await Audit.insertAudit(audit)

    return res.json({
      result: 'success',
      usuario: {
        id_usuario,
        id_perfil,
        nome
      },
      token: jwt.sign({
        id_usuario,
        login
      }, env.API_AUTH_SECRET_KEY, {
        expiresIn: env.API_AUTH_EXPIRES_IN
      })
    })
  }
}

export default new SessionController()
