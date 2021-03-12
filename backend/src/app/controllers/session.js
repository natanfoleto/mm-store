const jwt = require('jsonwebtoken');
const bcrypt = require('../utils/bcrypt');
const session = require('../models/session');
const SQL = require('../helper/SQL');
const message = require('../messages/session');
const authConfig = require('../../config/auth');

exports.create = async function (req, res) {
  const { login, password } = req.body;

  const response = await session.findUser(login);

  const sqlTreated = await SQL.build(response);

  //* Query executada com sucesso
  if (sqlTreated.result === 'success') {

    //* Nenhum usuário encontrado com os parâmetros passados
    if (sqlTreated.sql.affectedRows === 0) {
      return res.json({
        result: 'error',
        message: message.error.code1.subcode3.message
      })
    }

    const { id_usuario, id_perfil, nome, password_hash } = sqlTreated.sql[0];
    

    //* Comparar senha passada com a senha atual do usuário
    if (!(await bcrypt.checkPassword(password, password_hash))) {
      return res.json({ 
        result: 'error',
        message: message.error.code1.subcode4.message
      });
    }

    return res.json({
      result: 'success',
      usuario: {
        id_usuario,
        id_perfil,
        nome
      },
      token: jwt.sign({ id_usuario }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    });
  }
}