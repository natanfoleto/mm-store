const pool = require('../../database/pool');

const table = 'usuarios';

exports.listUser = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/listUser:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertUser = async function (user) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} (
        id_perfil, nome, login, password_hash
      ) VALUES (
        ?, ?, ?, ?
      );`;

      const binds = Object.values(user);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/insertUser:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateUser = async function (user) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET id_perfil = ?, nome = ?, login = ?, updated_at = ? 
        WHERE id_usuario = ?
      `;

      const binds = Object.values(user);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/updateUser:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteUser = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_usuario = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/deleteUser:");
      console.log(err);

      reject(err);
    }
  });
}

exports.findByProfile = async function (id_perfil) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}
        WHERE id_perfil = ?
      `;

      const binds = id_perfil;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/findByProfile:");
      console.log(err);

      reject(err);
    }
  });
}
