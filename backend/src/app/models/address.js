import { executeQuery } from '../../database/pool.js'

const table = 'enderecos'

class Address {
  async listAddress () {
    try {
      const query = `SELECT * from ${table}`

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from address.js/listAddress:')
      console.log(err)

      return err
    }
  }

  async insertAddress () {
    try {
      const query = `INSERT INTO ${table} 
        () 
        VALUES ()
      `

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from address.js/insertAddress:')
      console.log(err)

      return err
    }
  }

  async updateAddress (object) {
    try {
      const query = `UPDATE ${table} 
        SET logradouro = ?, numero = ?, cep = ?, bairro = ?, cidade = ?, uf = ?, latitude = ?, longitude = ?
        WHERE id_endereco = ?
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from address.js/updateAddress:')
      console.log(err)

      return err
    }
  }

  async deleteAddress (id) {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_endereco = ?
      `

      const binds = id

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from address.js/deleteAddress:')
      console.log(err)

      return err
    }
  }
}

export default new Address()
