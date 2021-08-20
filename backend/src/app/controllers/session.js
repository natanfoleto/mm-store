import jwt from 'jsonwebtoken'
import Session from '../models/session.js'
import { checkPassword } from '../utils/bcrypt.js'
import SQL from '../../lib/SQL.js'
import message from '../messages/session.js'
import env from '../../lib/configLoader.js'

class SessionController {
  async create (req, res) {
    const { login, password } = req.body

    const response = await Session.findUser(login)

    const sqlTreated = await SQL(response)

    //* Query executada com sucesso
    if (sqlTreated.result === 'success') {
      //* Nenhum usuário encontrado com os parâmetros passados
      if (typeof sqlTreated.sql[0] === 'undefined') {
        return res.json({
          result: 'error',
          message: message.error.code1.subcode3.message
        })
      }

      const { sql } = sqlTreated
      const { id_usuario, id_perfil, nome, password_hash } = sqlTreated.sql[0]

      const permissoes = sql.map((item) => {
        return item.id_permissao
      })

      //* Comparar senha passada com a senha atual do usuário
      if (!(await checkPassword(password, password_hash))) {
        return res.json({
          result: 'error',
          message: message.error.code1.subcode4.message
        })
      }

      return res.json({
        result: 'success',
        usuario: {
          id_usuario,
          id_perfil,
          nome,
          permissoes
        },
        token: jwt.sign({ id_usuario }, env.API_AUTH_SECRET_KEY, {
          expiresIn: env.API_AUTH_EXPIRES_IN
        })
      })
    }
  }
}

export default new SessionController()
