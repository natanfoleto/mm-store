const Profile = require('../models/Profile');
const User = require('../models/User');
const { schemaProfile } = require('../utils/yup');

const SQL = require('../helper/SQL');

exports.list = async function (req, res) {
  try {
    const response = await Profile.listProfile();

    return res.json(response);
  } catch (err) {
    console.log("Exception from ProfileController.js/list:");
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

    let profileValidate;

    await schemaProfile.validate(body).catch(function (err) {
      profileValidate = err;
    });

    if (profileValidate) {
      return res.status(206).json({
        result: 'error',
        details: profileValidate
      })
    }

    const response = await Profile.insertProfile(body.nome);

    const sqlTreated = await SQL.build(response);

    if (sqlTreated.result === 'error') {
      if (sqlTreated.errno === 1062) {
        return res.json({
          result: 'error',
          message: 'Cadastro duplicado. Já existe um perfil com este nome'
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
    console.log("Exception from ProfileController.js/create:");
    console.log(err);

    return res.status(400).json({
      result: 'error',
      message: 'Erro ao cadastrar perfil, consulte o log para mais informações'
    });
  }
}

exports.update = async function (req, res) {
  try {
    const body = req.body;

    let profileValidate;

    await schemaProfile.validate(body).catch(function (err) {
      profileValidate = err;
    });

    if (profileValidate) {
      return res.status(206).json({
        result: 'error',
        details: profileValidate
      })
    }

    const profile = {
      nome: body.nome,
      updated_at: new Date(),
      id_perfil: body.id_perfil
    }

    const response = await Profile.updateProfile(profile);

    const sqlTreated = await SQL.build(response);

    if (sqlTreated.result === 'error') {
      if (sqlTreated.errno === 1062) {
        return res.json({
          result: 'error',
          message: 'Cadastro duplicado. Já existe um perfil com este nome'
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
    console.log("Exception from ProfileController.js/update:");
    console.log(err);

    return res.status(400).json({
      result: 'error',
      message: 'Erro ao atualizar usuário, consulte o log para mais informações'
    });
  }
}

exports.delete = async function (req, res) {
  try {
    const { id_perfil } = req.body;

    const users = await User.findByPerfil(id_perfil);

    if (users[0]) {
      return res.json({
        result: 'error',
        message: 'Existem usuários atrelados a este perfil'
      });
    }

    const response = await Profile.deleteProfile(id_perfil);

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
    console.log("Exception from ProfileController.js/delete:");
    console.log(err);

    return res.status(400).json({
      result: 'error',
      message: 'Erro ao deletar usuário, consulte o log para mais informações'
    });
  }
}
