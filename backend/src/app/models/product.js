import { executeQuery } from '../../database/pool.js'

const table = 'produtos'

class Product {
  async listProduct () {
    try {
      const query = `SELECT * FROM ${table}`

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from product.js/listProduct:')
      console.log(err)

      return err
    }
  }

  async insertProduct (object) {
    try {
      const query = `INSERT INTO ${table} 
        (id_categoria, id_fornecedor, nome, preco_custo, preco_venda, preco_promocional, estoque, tamanho) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING *
      ;`

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from product.js/insertProduct:')
      console.log(err)

      return err
    }
  }

  async updateProduct (object) {
    try {
      const query = `UPDATE ${table} 
        SET id_categoria = ?, id_fornecedor = ?, nome = ?, preco_custo = ?, preco_venda = ?, preco_promocional = ?, estoque = ?, tamanho = ?, updated_at = ?
        WHERE id_produto = ?
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from product.js/updateProduct:')
      console.log(err)

      return err
    }
  }

  async deleteProduct (id) {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_produto = ?
      `

      const binds = id

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from product.js/deleteProduct:')
      console.log(err)

      return err
    }
  }

  async findProductByCategory (id_category) {
    try {
      const query = `SELECT * FROM ${table}
        WHERE id_categoria = ?
      `

      const binds = id_category

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from product.js/findByCategory:')
      console.log(err)

      return err
    }
  }

  async findProductByProvider (id_provider) {
    try {
      const query = `SELECT * FROM ${table}
        WHERE id_fornecedor = ?
      `

      const binds = id_provider

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from product.js/findByProvider:')
      console.log(err)

      return err
    }
  }
}

export default new Product()
