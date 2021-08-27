import { executeQuery } from '../../database/pool.js'

class Provider {
  async selectCountProvider (params) {
    try {
      const query = `
        SELECT id_fornecedor as id FROM fornecedores 
        WHERE cpf_cnpj = ? OR email = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchProvider (key) {
    try {
      const query = `
      (
        SELECT * FROM fornecedores
        WHERE nome LIKE "%${key}%"
      )
      UNION
      (
        SELECT * FROM fornecedores
        WHERE cpf_cnpj LIKE "%${key}%"
      )
      UNION
      (
        SELECT * FROM fornecedores
        WHERE email LIKE "%${key}%"
      )
      UNION
      (
        SELECT * FROM fornecedores
        WHERE celular LIKE "%${key}%"
      )
    `

      const result = await executeQuery(query)

      return result
    } catch (err) {
      return err
    }
  }

  async insertProvider (params) {
    try {
      const query = `
        INSERT INTO fornecedores 
        (id_endereco, nome, cpf_cnpj, email, celular, obs) 
        VALUES (?, ?, ?, ?, ?, ?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async updateProvider (params) {
    try {
      const query = `
        UPDATE fornecedores 
        SET nome = ?, cpf_cnpj = ?, email = ?, celular = ?, obs = ?, updated_at = ?
        WHERE id_fornecedor = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deleteProvider (params) {
    try {
      const query = `
        DELETE FROM fornecedores  
        WHERE id_fornecedor = ?
        RETURNING id_endereco
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Provider()
