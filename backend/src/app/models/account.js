import { executeQuery } from '../../database/pool.js'

class Account {
  async searchAccount (key) {
    try {
      const query = `
        SELECT ct.*, cl.nome, cl.cpf
        FROM contas ct
        INNER JOIN clientes cl ON (cl.id_cliente = ct.id_cliente)
      `

      const result = await executeQuery(query)

      return result
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
