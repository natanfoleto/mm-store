const yup = require('yup');

schemaUser = yup.object().shape({
  id_perfil: yup.number().required().positive(),
  nome: yup.string().required(),
  login: yup.string().required(),
  password: yup.string().min(6).max(32),
});

schemaProfile = yup.object().shape({
  nome: yup.string().required()
});

module.exports = { schemaUser, schemaProfile };

