import User from '../models/user.js'
import pagingData from '../utils/pagingData.js'
import { encryptPassword } from '../utils/bcrypt.js'
import message from '../messages/user.js'

import SQL from '../helper/SQL.js'

class UserController {
  async search(req, res) {
    try {
      const { key } = req.body;
      
      const response = await User.searchUser(key || "");
  
      const pagedData = await pagingData(response, req.params);
  
      return res.json(pagedData);
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
  
      const user = {
        id_perfil: body.id_perfil,
        nome: body.nome,
        login: body.login,
        password_hash: await encryptPassword(body.password)
      }
  
      const response = await User.insertUser(user);
  
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
  
      const user = {
        id_perfil: body.id_perfil,
        nome: body.nome,
        login: body.login,
        updated_at: new Date(),
        id_usuario: body.id_usuario
      }
  
      const response = await User.updateUser(user);
  
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
      const { id_usuario } = req.body;
  
      const response = await User.deleteUser(id_usuario);
  
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


export default new UserController()
