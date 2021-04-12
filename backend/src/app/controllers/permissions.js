import Permissons from '../models/permissions.js'
import pagingData from '../utils/pagingData.js'
import message from '../messages/permissions.js'

import SQL from '../helper/SQL.js'

class PermissionsController {
  async search(req, res) {
    try {
      const { key } = req.body;
      
      const response = await Permissons.searchPermissions(key || "");

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
  
      const permissions = {
        id_perfil: body.id_perfil,
        id_permissao: body.id_permissao
      }
  
      const response = await Permissons.insertPermissions(permissions);
  
      const sqlTreated = await SQL(response);
  
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
  
      const permissions = {
        id_perfil: body.id_perfil,
        id_permissao: body.id_permissao,
        id_permissao_perfil: body.id_permissao_perfil
      }
  
      const response = await Permissons.updatePermissions(permissions);
  
      const sqlTreated = await SQL(response);
  
      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
  
        //* Nenhuma das permissões encontradas com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode1.message
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
      const { id_permissao_perfil } = req.body;
  
      const response = await Permissons.deletePermissions(id_permissao_perfil);
  
      const sqlTreated = await SQL(response);
  
      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
  
        //* Nenhuma das permissões encontradas com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode1.message
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

export default new PermissionsController()
