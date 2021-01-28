const User = require('../models/User');
const bcrypt = require('../utils/bcrypt');
const { schemaUser } = require('../utils/yup');

const SQL = require('../helper/SQL');

exports.list = async function (req, res) {
  try {
    const response = await User.listUser();

    return res.json(response);
  } catch (err) {
    console.log("Exception from UserController.js/list:");
    console.log(err);

    return res.status(400).json({
      result: 'error',
      message: 'Erro ao listar usuários, consulte o log para mais informações'
    });
  }
}

exports.create = async function (req, res) {
  try {
    const body = req.body;

    let userValidate;

    await schemaUser.validate(body).catch(function (err) {
      userValidate = err;
    });

    if (userValidate) {
      return res.status(206).json({
        result: 'error',
        details: userValidate
      })
    }

    const user = {
      id_perfil: body.id_perfil,
      nome: body.nome,
      login: body.login,
      password_hash: await bcrypt.encryptPassword(body.password)
    }

    const response = await User.insertUser(user);

    const sqlTreated = await SQL.build(response);

    if (sqlTreated.result === 'error') {
      if (sqlTreated.errno === 1062) {
        return res.json({
          result: 'error',
          message: 'Cadastro duplicado. Já existe um usuário com este login'
        })
      }
    }

    if (sqlTreated.result === 'success') {
      return res.json({
        result: 'success',
        message: 'Cadastrado com sucesso'
      })
    }

    return res.json(sqlTreated);
  } catch (err) {
    console.log("Exception from UserController.js/create:");
    console.log(err);

    return res.status(400).json({
      result: 'error',
      message: 'Erro ao cadastrar usuário, consulte o log para mais informações'
    });
  }
}

exports.update = async function (req, res) {
  try {
    const body = req.body;

    let userValidate;

    await schemaUser.validate(body).catch(function (err) {
      userValidate = err;
    });

    if (userValidate) {
      return res.status(206).json({
        result: 'error',
        details: userValidate
      })
    }

    const user = {
      id_perfil: body.id_perfil,
      nome: body.nome,
      login: body.login,
      updated_at: new Date(),
      id_usuario: body.id_usuario
    }

    const response = await User.updateUser(user);

    const sqlTreated = await SQL.build(response);

    if (sqlTreated.result === 'error') {
      if (sqlTreated.errno === 1062) {
        return res.json({
          result: 'error',
          message: 'Cadastro duplicado. Já existe um usuário com este login'
        })
      }
    }

    if (sqlTreated.result === 'success') {
      return res.json({
        result: 'success',
        message: 'Atualizado com sucesso'
      })
    }

    return res.json(sqlTreated);
  } catch (err) {
    console.log("Exception from UserController.js/update:");
    console.log(err);

    return res.status(400).json({
      result: 'error',
      message: 'Erro ao atualizar usuário, consulte o log para mais informações'
    });
  }
}

exports.delete = async function (req, res) {
  try {
    const { id_usuario } = req.body;

    const response = await User.deleteUser(id_usuario);

    const sqlTreated = await SQL.build(response);

    if (sqlTreated.result === 'error') {
      return res.json({
        result: 'error',
        message: sqlTreated.errno
      })
    }

    if (sqlTreated.result === 'success') {
      return res.json({
        result: 'success',
        message: 'Deletado com sucesso'
      });
    }

    return res.json(sqlTreated);
  } catch (err) {
    console.log("Exception from UserController.js/delete:");
    console.log(err);

    return res.status(400).json({
      result: 'error',
      message: 'Erro ao deletar usuário, consulte o log para mais informações'
    });
  }
}
