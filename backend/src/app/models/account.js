import { executeQuery } from '../../database/pool.js'

class Account {
  async searchAccount (key, limit, offset) {
    try {
      const query = `
        SELECT ct.*, cl.nome, cl.cpf
        FROM contas ct
        INNER JOIN clientes cl ON (cl.id_cliente = ct.id_cliente)
        LIMIT ${limit}
        OFFSET ${offset}
      `

      const data = await executeQuery(query)
      const total = data.length

      return { data, total }
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
