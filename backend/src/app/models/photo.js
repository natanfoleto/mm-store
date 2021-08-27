import { executeQuery } from '../../database/pool.js'

class Photo {
  async selectCountPhoto (params) {
    try {
      const query = `
        SELECT COUNT(url) as count FROM fotos_produtos WHERE url = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchPhoto () {
    try {
      const query = 'SELECT * FROM fotos_produtos'

      const result = await executeQuery(query)

      return result
    } catch (err) {
      return err
    }
  }

  async insertPhoto (params) {
    try {
      const query = `
        INSERT INTO fotos_produtos
        (id_produto, nome, path, url) 
        VALUES (?, ?, ?, ?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deletePhoto (params) {
    try {
      const query = `
        DELETE FROM fotos_produtos 
        WHERE id_foto = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Photo()
