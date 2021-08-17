import { executeQuery } from '../../database/pool.js'

const table = 'pedidos'

class Wish {
  async listWish () {
    try {
      const query = `SELECT * FROM ${table}`

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from wish.js/listWish:')
      console.log(err)

      return err
    }
  }

  async insertWish (object) {
    try {
      const query = `INSERT INTO ${table} 
        (id_cliente, descricao, url_foto) 
        VALUES (?, ?, ?)
        RETURNING *
      ;`

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from wish.js/insertWish:')
      console.log(err)

      return err
    }
  }

  async updateWish (object) {
    try {
      const query = `UPDATE ${table} 
        SET descricao = ?, url_foto = ?
        WHERE id_pedido = ?
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from wish.js/updateWish:')
      console.log(err)

      return err
    }
  }

  async deleteWish (id) {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_pedido = ?
      `

      const binds = id

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from wish.js/deleteWish:')
      console.log(err)

      return err
    }
  }
}

export default new Wish()
