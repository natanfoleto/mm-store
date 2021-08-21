import { executeQuery } from '../../database/pool.js'

const table = 'fotos_produtos'

class Photo {
  async listPhoto () {
    try {
      const query = `SELECT * FROM ${table}`

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from photo.js/listPhoto:')
      console.log(err)

      return err
    }
  }

  async insertPhoto (object) {
    try {
      const query = `
        INSERT INTO ${table} 
        (id_produto, nome, path, url) 
        VALUES (?, ?, ?, ?)
        RETURNING *
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from photo.js/insertPhoto:')
      console.log(err)

      return err
    }
  }

  async deletePhoto (id) {
    try {
      const query = `
        DELETE FROM ${table}  
        WHERE id_foto = ?
      `

      const binds = id

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from photo.js/deletePhoto:')
      console.log(err)

      return err
    }
  }
}

export default new Photo()
