const bcrypt = require('bcryptjs');

exports.encryptPassword = async function (password) {
  return await bcrypt.hash(password, 8);
}

exports.checkPassword = async function (password, currentPassword) {
  return await bcrypt.compare(password, currentPassword);
}