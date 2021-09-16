import { executeQuery } from '../../database/pool.js'

class Address {
  async searchAddress (key, limit, offset) {
    try {
      const query = `
        SELECT * from enderecos
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
}

export default new Address()
