import Category from '../models/category.js'
import Product from '../models/product.js'
import message from '../messages/category.js'

import SQL from '../helper/SQL.js'

class CategoryController {
  async list(req, res) {
    try {
      const response = await Category.listCategory();
  
      return res.json(response);
    } catch (err) {
      
      //! Erro Internal Server
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      });
    }
  }
  
  async create(req, res) {
    try {
      const body = req.body;
  
      const response = await Category.insertCategory(body.nome);
  
      const sqlTreated = await SQL(response);
  
      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
  
        //! Erro de cadastro duplicado
        if (sqlTreated.errno === 1062) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode1.message
          })
        }
      }
  
      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
        return res.json({
          result: 'success',
          message: message.success.code1.subcode1.message
        })
      }
  
      return res.json(sqlTreated);
    } catch (err) {
      
      //! Erro Internal Server
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      });
    }
  }
  
  async update(req, res) {
    try {
      const body = req.body;
  
      const category = {
        nome: body.nome,
        updated_at: new Date(),
        id_categoria: body.id_categoria
      }
  
      const response = await Category.updateCategory(category);
  
      const sqlTreated = await SQL(response);
  
      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
  
        //! Erro de cadastro duplicado
        if (sqlTreated.errno === 1062) {
          return res.json({
            result: sqlTreated.result,
            message: message.error.code1.subcode1.message
          })
        }
      }
  
      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
  
        //* Nenhum usuário encontrado com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }
  
        return res.json({
          result: sqlTreated.result,
          message: message.success.code1.subcode2.message
        })
      }
  
      return res.json(sqlTreated);
    } catch (err) {
      
      //! Erro Internal Server
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      });
    }
  }
  
  async remove(req, res) {
    try {
      const { id_categoria } = req.body;
  
      const users = await Product.findProductByCategory(id_categoria);
  
      //* Existem produtos atrelados a esta categoria
      if (users[0]) {
        return res.json({
          result: 'error',
          message: message.error.code1.subcode3.message
        })
      }
  
      const response = await Category.deleteCategory(id_categoria);
  
      const sqlTreated = await SQL(response);
  
      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        return res.json(sqlTreated)
      }
  
      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
  
        //* Nenhum usuário encontrado com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }
  
        return res.json({
          result: 'success',
          message: message.success.code1.subcode3.message
        });
      }
  
      return res.json(sqlTreated);
    } catch (err) {
  
      //! Internal Server Error
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      });
    }
  }
}

export default new CategoryController()
