import { executeQuery } from '../../database/pool.js'

const table = 'auditoria'

class Audit {
  async insertAudit (object) {
    try {
      const query = `
        INSERT INTO ${table} 
        (login, route, method, body, moment) 
        VALUES (?, ?, ?, ?, ?)
        RETURNING *
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from audit.js/insertAudit:')
      console.log(err)

      return err
    }
  }
}

export default new Audit()
