import Client from '../models/client.js'
import Account from './account.js'
import message from '../messages/client.js'

import SQL from '../helper/SQL.js'

class ClientController {
  async list(req, res) {
    try {
      const response = await Client.listClient();
  
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
  
      const client = {
        nome: body.nome,
        cpf: body.cpf,
        email: body.email || null,
        data_nasc: body.data_nasc,
        celular: body.celular || null,
        password: body.password
      }
  
      const response = await Client.insertClient(client);
  
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
  
        //TODO Criar conta e vincular com cliente
        await Account.accountCreate(sqlTreated.sql[0].id_cliente)
        
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
  
      const client = {
        nome: body.nome,
        cpf: body.cpf,
        email: body.email || null,
        data_nasc: body.data_nasc,
        celular: body.celular || null,
        password: body.password || null,
        updated_at: new Date(),
        id_cliente: body.id_cliente
      }
  
      const response = await Client.updateClient(client);
  
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
      const { id_cliente } = req.body;
  
      const response = await Client.deleteClient(id_cliente);
  
      const sqlTreated = await SQL(response);
  
      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        return res.json(sqlTreated)
      }
  
      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
  
        //* Nenhum cliente encontrado com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode2.message
          })
        }
  
        //TODO Excluir conta vinculada ao cliente
        await Account.accountRemove(id_cliente);
      
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

export default new ClientController()
