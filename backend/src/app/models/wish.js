import { executeQuery } from '../../database/pool.js'

class Wish {
  async searchWish (key) {
    try {
      const query = `
        (
          SELECT * FROM pedidos
          WHERE descricao LIKE "%${key}%"
        )
        UNION
        (
          SELECT pd.* FROM pedidos pd
          INNER JOIN clientes cl ON cl.id_cliente = pd.id_cliente
          WHERE cl.nome LIKE "%${key}%"
        )
      `

      const result = await executeQuery(query)

      return result
    } catch (err) {
      return err
    }
  }

  async insertWish (params) {
    try {
      const query = `
        INSERT INTO pedidos 
        (id_cliente, descricao, url_foto) 
        VALUES (?, ?, ?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async updateWish (params) {
    try {
      const query = `
        UPDATE pedidos 
        SET descricao = ?, url_foto = ?
        WHERE id_pedido = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deleteWish (params) {
    try {
      const query = `
        DELETE FROM pedidos  
        WHERE id_pedido = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Wish()
