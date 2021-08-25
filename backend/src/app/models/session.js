import { executeQuery } from '../../database/pool.js'

class Session {
  async findUser (params) {
    try {
      const query = `
        SELECT * FROM usuarios
        WHERE login = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Session()
