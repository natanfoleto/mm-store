import Product from '../models/product.js'
import Photo from '../models/photo.js'
import pagingData from '../utils/pagingData.js'
import message from '../messages/product.js'

class ProductController {
  async search (req, res) {
    try {
      const { key } = req.body

      const response = await Product.searchProduct(key || '')

      for (const [index, value] of response.entries()) {
        const photos = await Photo.searchPhotoByProduct(value.id_produto)

        const array = []

        for (const item of photos) {
          array.push(item)
        }

        response[index].fotos = array
      }

      const pagedData = await pagingData(response, req.params)

      return res.json(pagedData)
    } catch (err) {
      //! Erro Internal Server
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async create (req, res) {
    try {
      const {
        id_categoria, id_fornecedor, nome, preco_custo,
        preco_venda, estoque, tamanho
      } = req.body

      const count = await Product.selectCountProduct(nome)

      if (count) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const product = [
        id_categoria, id_fornecedor || null, nome, preco_custo,
        preco_venda, estoque, tamanho || null
      ]

      const response = await Product.insertProduct(product)

      if (response[0]) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode1.message
        })
      } else {
        //! Erro ao executar query
        return res.json({
          result: 'error',
          message: response
        })
      }
    } catch (err) {
      //! Erro Internal Server
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async update (req, res) {
    try {
      const {
        id_categoria, id_fornecedor, nome, preco_custo, preco_venda,
        estoque, tamanho, id_produto
      } = req.body

      const count = await Product.selectCountProduct(nome)

      if (count && count.id !== Number(id_produto)) {
        //! Erro de cadastro duplicado
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }

      const product = [
        id_categoria, id_fornecedor, nome, preco_custo, preco_venda,
        estoque, tamanho, new Date(), id_produto
      ]

      const response = await Product.updateProduct(product)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode2.message
        })
      } else {
        //* Nenhum produto encontrado com os parâmetros passados
        if (affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }
        //! Erro ao executar query
        return res.json({
          result: 'error',
          message: response
        })
      }
    } catch (err) {
      //! Erro Internal Server
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async remove (req, res) {
    try {
      const { id_produto } = req.body

      const response = await Product.deleteProduct(id_produto)

      const { affectedRows } = response

      if (affectedRows) {
        //* Query executada com sucesso
        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        })
      } else {
        //* Nenhum produto encontrado com os parâmetros passados
        if (affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }
        //! Erro ao executar query
        return res.json({
          result: 'error',
          message: response
        })
      }
    } catch (err) {
      //! Internal Server Error
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }
}

export default new ProductController()
