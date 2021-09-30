import { executeQuery } from '../../database/pool.js'

class Category {
  async selectCountCategory (params) {
    try {
      const query = `
        SELECT id_categoria as id FROM categorias WHERE nome = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchCategory (key, limit, offset) {
    try {
      const cWhere = `
        WHERE nome LIKE "%${key}%"
      `

      const queryCount = `
        SELECT COUNT(id_categoria) AS count FROM categorias
        ${cWhere}
      `

      const query = `
        SELECT * FROM categorias
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

  async insertCategory (params) {
    try {
      const query = `
        INSERT INTO categorias 
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

  async updateCategory (params) {
    try {
      const query = `
        UPDATE categorias 
        SET nome = ?, updated_at = ? 
        WHERE id_categoria = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deleteCategory (params) {
    try {
      const query = `
        DELETE FROM categorias  
        WHERE id_categoria = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Category()
