import Permisson from '../models/permission.js'
import message from '../messages/permission.js'

import SQL from '../helper/SQL.js'

function isEmpty(str) {
  return (!str || str.length === 0 );
}

class PermissionController {
  async search(req, res) {
    try {
      let params, response;

      const { tipo, contexto } = req.body;

      if (!isEmpty(tipo) && !isEmpty(contexto)) {
        params = { tipo: tipo, contexto: contexto }

        response = await Permisson.searchPermission(params);
      } else if (!isEmpty(tipo) && isEmpty(contexto)) {
        params = { tipo: tipo }

        response = await Permisson.searchPermission(params);
      } else if (isEmpty(tipo) && !isEmpty(contexto)) {
        params = { contexto: contexto }

        response = await Permisson.searchPermission(params);
      } else {
        response = await Permisson.searchPermissionAll();
      }

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
  
      const permission = {
        tipo: body.tipo,
        descricao: body.descricao,
        contexto: body.contexto
      }
  
      const response = await Permisson.insertPermission(permission);
  
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
  
      const permission = {
        tipo: body.tipo,
        descricao: body.descricao,
        contexto: body.contexto || null,
        id_permissao: body.id_permissao
      }
  
      const response = await Permisson.updatePermission(permission);
  
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
  
        //* Nenhuma permissão encontrada com os parâmetros passados
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
      const { id_permissao } = req.body;
  
      const response = await Permisson.deletePermission(id_permissao);
  
      const sqlTreated = await SQL(response);
  
      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        return res.json(sqlTreated)
      }
  
      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
  
        //* Nenhuma permissão encontrada com os parâmetros passados
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

export default new PermissionController()
