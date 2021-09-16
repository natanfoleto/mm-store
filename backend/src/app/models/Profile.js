import { executeQuery } from '../../database/pool.js'

class Profile {
  async selectCountProfile (params) {
    try {
      const query = `
        SELECT id_perfil as id FROM perfis WHERE nome = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchProfile (key, limit, offset) {
    try {
      const query = `
        SELECT *
        FROM perfis
        WHERE nome LIKE "%${key}%" 
        LIMIT ${limit}
        OFFSET ${offset}
      `

      const queryCount = `
        SELECT COUNT(id_perfil) AS count FROM perfis
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

  async insertProfile (params) {
    try {
      const query = `
        INSERT INTO perfis 
        (nome) 
        VALUES (?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async updateProfile (params) {
    try {
      const query = `
        UPDATE perfis 
        SET nome = ?, updated_at = ? 
        WHERE id_perfil = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deleteProfile (params) {
    try {
      const query = `
        DELETE FROM perfis  
        WHERE id_perfil = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Profile()
