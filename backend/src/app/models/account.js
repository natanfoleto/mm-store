import { executeQuery } from '../../database/pool.js'

class Account {
  async searchAccount (key, limit, offset) {
    try {
      const cWhere = 'INNER JOIN clientes cl ON (cl.id_cliente = ct.id_cliente)'

      const queryCount = `
        SELECT COUNT(id_conta) AS count FROM contas ct
        ${cWhere}
      `

      const query = `
        SELECT ct.*, cl.nome, cl.cpf
        FROM contas ct
        ${cWhere}
        LIMIT ${limit}
        OFFSET ${offset}
      `

      const [{ count }] = await executeQuery(queryCount)
      const data = await executeQuery(query)

      return { data, total: count }
    } catch (err) {
      return err
    }
  }

  async searchOneAccount (params) {
    try {
      const query = `
        SELECT *
        FROM contas
        WHERE id_cliente = ?
        LIMIT 1
      `

      const data = await executeQuery(query, params)

      return { data }
    } catch (err) {
      return err
    }
  }

  async insertAccount (params) {
    try {
      const query = `
        INSERT INTO contas 
        (id_cliente) 
        VALUES (?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Account()
