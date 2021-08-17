import { executeQuery } from '../../database/pool.js'

const table = 'categorias'

class Category {
  async listCategory () {
    try {
      const query = `SELECT * FROM ${table}`

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from category.js/listCategory:')
      console.log(err)

      return err
    }
  }

  async insertCategory (nome) {
    try {
      const query = `INSERT INTO ${table} 
        (nome) 
        VALUES (?)
        RETURNING *
      ;`

      const binds = nome

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from category.js/insertCategory:')
      console.log(err)

      return err
    }
  }

  async updateCategory (nome) {
    try {
      const query = `UPDATE ${table} 
        SET nome = ?, updated_at = ? 
        WHERE id_categoria = ?
      `

      const binds = Object.values(nome)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from category.js/updateCategory:')
      console.log(err)

      return err
    }
  }

  async deleteCategory (id) {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_categoria = ?
      `

      const binds = id

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from category.js/deleteCategory:')
      console.log(err)

      return err
    }
  }
}

export default new Category()
