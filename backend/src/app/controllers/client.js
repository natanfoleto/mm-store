const Client = require('../models/client');
const AccountController = require('./account')
const message = require('../messages/client');

const SQL = require('../helper/SQL');

exports.list = async function (req, res) {
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

exports.create = async function (req, res) {
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

    const sqlTreated = await SQL.build(response);

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
      await AccountController.create(sqlTreated.sql.insertId)
      
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

exports.update = async function (req, res) {
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

    const sqlTreated = await SQL.build(response);

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

exports.delete = async function (req, res) {
  try {
    const { id_cliente } = req.body;

    const response = await Client.deleteClient(id_cliente);

    const sqlTreated = await SQL.build(response);

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
      await AccountController.delete(id_cliente);
    
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
