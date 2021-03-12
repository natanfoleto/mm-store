const Address = require('../models/address');
const Client = require('../models/client');
const Provider = require('../models/provider');
const message = require('../messages/address');

const SQL = require('../helper/SQL');

exports.list = async function (req, res) {
  try {
    const response = await Address.listAddress();

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

    const address = {
      id_pessoa: body.id_pessoa,
      tipo_pessoa: body.tipo_pessoa,
      logradouro: body.logradouro,
      numero: body.numero,
      cep: body.cep || null,
      bairro: body.bairro || null,
      cidade: body.cidade,
      uf: body.uf,
      latitude: body.latitude || null,
      longitude: body.longitude || null
    }

    const response = await Address.insertAddress(address);

    const sqlTreated = await SQL.build(response);

    //! Erro ao executar query no banco
    if (sqlTreated.result === 'error') {
      return res.json(sqlTreated)
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

exports.update = async function (req, res) {
  try {
    const body = req.body;

    const address = {
      logradouro: body.logradouro,
      numero: body.numero,
      cep: body.cep || null,
      bairro: body.bairro || null,
      cidade: body.cidade,
      uf: body.uf,
      latitude: body.latitude || null,
      longitude: body.longitude || null,
      id_endereco: body.id_endereco
    }

    const response = await Address.updateAddress(address);

    const sqlTreated = await SQL.build(response);

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

exports.delete = async function (req, res) {
  try {
    const { id_endereco } = req.body;

    const clients = await Client.findByAddress(id_endereco);
    const providers = await Provider.findByAddress(id_endereco);

    //* Existem clientes ou fornecedores atrelados a este endereço
    if (clients[0] || providers[0]) {
      return res.json({
        result: 'error',
        message: message.error.code1.subcode2.message
      })
    }

    const response = await Address.deleteProvider(id_endereco);

    const sqlTreated = await SQL.build(response);

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
