import { executeQuery } from '../../database/pool.js'

const table = 'fornecedores'

class Provider {
  async listProvider () {
    try {
      const query = `SELECT * FROM ${table}`

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from provider.js/listProvider:')
      console.log(err)

      return err
    }
  }

  async insertProvider (object) {
    try {
      const query = `
        INSERT INTO ${table} 
        (id_endereco, nome, cpf_cnpj, email, celular, obs) 
        VALUES (?, ?, ?, ?, ?, ?)
        RETURNING *
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from provider.js/insertProvider:')
      console.log(err)

      return err
    }
  }

  async updateProvider (object) {
    try {
      const query = `
        UPDATE ${table} 
        SET nome = ?, cpf_cnpj = ?, email = ?, celular = ?, obs = ?, updated_at = ?
        WHERE id_fornecedor = ?
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from provider.js/updateProvider:')
      console.log(err)

      return err
    }
  }

  async deleteProvider (id) {
    try {
      const query = `
        DELETE FROM ${table}  
        WHERE id_fornecedor = ?
        RETURNING id_endereco
      `

      const binds = id

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from provider.js/deleteProvider:')
      console.log(err)

      return err
    }
  }
}

export default new Provider()
