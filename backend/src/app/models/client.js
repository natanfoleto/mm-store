import { executeQuery } from '../../database/pool.js'

class Client {
  async selectCountClient (params) {
    try {
      const query = `
        SELECT id_cliente as id FROM clientes 
        WHERE cpf = ? OR email = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchClient (key, limit, offset) {
    try {
      const query = `
        (
          SELECT * FROM clientes
          WHERE nome LIKE "%${key}%"
          LIMIT ${limit}
          OFFSET ${offset}
        )
        UNION
        (
          SELECT * FROM clientes
          WHERE cpf LIKE "%${key}%"
          LIMIT ${limit}
          OFFSET ${offset}
        )
        UNION
        (
          SELECT * FROM clientes
          WHERE email LIKE "%${key}%"
          LIMIT ${limit}
          OFFSET ${offset}
        )
        UNION
        (
          SELECT * FROM clientes
          WHERE celular LIKE "%${key}%"
          LIMIT ${limit}
          OFFSET ${offset}
        )
      `

      const queryCount = `
        SELECT COUNT(id_cliente) AS count FROM clientes
      `

      let total
      const [{ count }] = await executeQuery(queryCount)
      const data = await executeQuery(query)

      if (key === '') { total = count } else { total = data.length }

      return { data, total }
    } catch (err) {
      return err
    }
  }

  async insertClient (params) {
    try {
      const query = `
        INSERT INTO clientes 
        (id_endereco, nome, cpf, email, data_nasc, celular, password_hash) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async updateClient (params) {
    try {
      const query = `
        UPDATE clientes 
        SET nome = ?, cpf = ?, email = ?, data_nasc = ?, celular = ?, password_hash = ?, updated_at = ?
        WHERE id_cliente = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deleteClient (params) {
    try {
      const query = `
        DELETE FROM clientes  
        WHERE id_cliente = ?
        RETURNING id_endereco
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Client()
