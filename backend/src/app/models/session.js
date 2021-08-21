import { executeQuery } from '../../database/pool.js'

class Session {
  async findUser (login) {
    try {
      const query = `
        SELECT * FROM usuarios
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
