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
      const cWhere = `
        INNER JOIN enderecos ed ON ed.id_endereco = cl.id_endereco
        WHERE nome LIKE "%${key}%" OR cpf LIKE "%${key}%"
      `

      const queryCount = `
        SELECT COUNT(id_cliente) AS count FROM clientes cl
        ${cWhere}
      `

      const query = `
        SELECT cl.*, ed.logradouro, ed.numero, ed.cep, ed.bairro, ed.cidade, ed.uf, ed.latitude, ed.longitude FROM clientes cl
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
        SET nome = ?, cpf = ?, email = ?, data_nasc = ?, celular = ?, updated_at = ?
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
