import { executeQuery } from '../../database/pool.js'

class Product {
  async selectCountProduct (params) {
    try {
      const query = `
        SELECT id_produto as id FROM produtos WHERE nome = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchProduct (key, limit, offset) {
    try {
      const cWhere = `
        INNER JOIN categorias ct ON pd.id_categoria = ct.id_categoria
        WHERE pd.nome LIKE "%${key}%" OR ct.nome LIKE "%${key}%"
      `

      const queryCount = `
        SELECT COUNT(id_produto) AS count FROM produtos pd
        ${cWhere}
      `

      const query = `
        SELECT pd.*, ct.nome AS categoria
        FROM produtos pd
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

  async insertProduct (params) {
    try {
      const query = `
        INSERT INTO produtos 
        (id_categoria, id_fornecedor, nome, preco_custo, preco_venda, estoque, tamanho) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async updateProduct (object) {
    try {
      const query = `
        UPDATE produtos 
        SET id_categoria = ?, id_fornecedor = ?, nome = ?, preco_custo = ?, preco_venda = ?, estoque = ?, tamanho = ?, updated_at = ?
        WHERE id_produto = ?
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      return err
    }
  }

  async deleteProduct (params) {
    try {
      const query = `
        DELETE FROM produtos  
        WHERE id_produto = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async findProductByCategory (params) {
    try {
      const query = `
        SELECT * FROM produtos
        WHERE id_categoria = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async findProductByProvider (params) {
    try {
      const query = `
        SELECT * FROM produtos
        WHERE id_fornecedor = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Product()
