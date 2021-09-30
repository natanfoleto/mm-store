import { executeQuery } from '../../database/pool.js'

class Address {
  async searchAddress (key, limit, offset) {
    try {
      const queryCount = `
        SELECT COUNT(id_endereco) AS count FROM enderecos
      `

      const query = `
        SELECT * from enderecos
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

  async searchOneAddres (params) {
    try {
      const query = `
        SELECT *
        FROM enderecos
        WHERE id_endereco = ?
        LIMIT 1
      `

      const data = await executeQuery(query, params)

      return { data }
    } catch (err) {
      return err
    }
  }

  async insertAddress () {
    try {
      const query = `
        INSERT INTO enderecos 
        () 
        VALUES ()
      `

      const result = await executeQuery(query)

      return result
    } catch (err) {
      return err
    }
  }

  async updateAddress (params) {
    try {
      const query = `
        UPDATE enderecos 
        SET logradouro = ?, numero = ?, cep = ?, bairro = ?, cidade = ?, uf = ?, latitude = ?, longitude = ?
        WHERE id_endereco = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deleteAddress (params) {
    try {
      const query = `
        DELETE FROM enderecos 
        WHERE id_endereco = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Address()
