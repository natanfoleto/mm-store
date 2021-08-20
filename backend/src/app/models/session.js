import { executeQuery } from '../../database/pool.js'

class Session {
  async findUser (login) {
    try {
      const query = `
        SELECT us.*, pm.* FROM usuarios us
        INNER JOIN permissoes_perfis pp ON (us.id_perfil = pp.id_perfil)
        INNER JOIN permissoes pm ON (pp.id_permissao = pm.id_permissao)
        WHERE login = ?
      `

      const binds = login

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from session.js/findUser:')
      console.log(err)

      return err
    }
  }
}

export default new Session()
