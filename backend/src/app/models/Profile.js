const pool = require('../../database/pool');

const table = 'perfis';

exports.listProfile = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from Profile.js/listProfile:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertProfile = async function (nome) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} (
        nome
      ) VALUES (
        ?
      );`;

      const binds = nome;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from Profile.js/insertProfile:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateProfile = async function (nome) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET nome = ?, updated_at = ? 
        WHERE id_perfil = ?
      `;

      const binds = Object.values(nome);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from Profile.js/updateProfile:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteProfile = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_perfil = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from Profile.js/deleteProfile:");
      console.log(err);

      reject(err);
    }
  });
}
