const Account = require('../models/account');
const message = require('../messages/account');

const SQL = require('../helper/SQL');

exports.list = async function (req, res) {
  try {
    const response = await Account.listAccount();

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

exports.create = async function (account) {
  try {
    const response = await Account.insertAccount(account);

    const sqlTreated = await SQL.build(response);

    return sqlTreated;
  } catch (err) {
    
    //! Erro Internal Server
    return {
      result: 'error',
      message: message.error.code1.subcode99.message,
      error: err.toString(),
    };
  }
}

exports.update = async function (account) {
  try {
    const response = await Account.update(account);

    const sqlTreated = await SQL.build(response);

    return sqlTreated;
  } catch (err) {
    
    //! Erro Internal Server
    return {
      result: 'error',
      message: message.error.code1.subcode99.message,
      error: err.toString(),
    };
  }
}

exports.delete = async function (id) {
  try {
    const response = await Account.deleteAccount(id);

    const sqlTreated = await SQL.build(response);

    return sqlTreated;
  } catch (err) {

    //! Internal Server Error
    return {
      result: 'error',
      message: message.error.code1.subcode99.message,
      error: err.toString(),
    };
  }
}
