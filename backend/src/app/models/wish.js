import { executeQuery } from '../../database/pool.js'

class Wish {
  async searchWish (key, limit, offset) {
    try {
      const cWhere = `
        INNER JOIN clientes cl ON cl.id_cliente = pd.id_cliente
        WHERE pd.descricao LIKE "%${key}%" OR cl.nome LIKE "%${key}%"
      `

      const queryCount = `
        SELECT COUNT(id_pedido) AS count FROM pedidos pd
        ${cWhere}
      `

      const query = `
        SELECT pd.*, cl.nome AS cliente FROM pedidos pd
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

  async searchWishByClient (id_cliente) {
    try {
      const cWhere = `
        INNER JOIN clientes cl ON cl.id_cliente = pd.id_cliente
        WHERE pd.id_cliente = ${id_cliente}
      `

      const queryCount = `
        SELECT COUNT(id_pedido) AS count FROM pedidos pd
        ${cWhere}
      `

      const query = `
        SELECT pd.*, cl.nome AS cliente FROM pedidos pd
        ${cWhere}
      `

      const [{ count }] = await executeQuery(queryCount)
      const data = await executeQuery(query)

      return { data, total: count }
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
