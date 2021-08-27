import { executeQuery } from '../../database/pool.js'

class Address {
  async searchAddress () {
    try {
      const query = `
        SELECT * from enderecos
      `

      const result = await executeQuery(query)

      return result
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
