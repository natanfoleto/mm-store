const pool = require('../../database/pool');

const table = 'usuarios';

async function searchUser(key) {
  return new Promise(async (resolve, reject) => {
    try {
      query = `
        (SELECT * FROM ${table} WHERE nome LIKE "%${key}%")
        UNION
        (SELECT * FROM ${table} WHERE login LIKE "%${key}%")
        UNION
        (SELECT * FROM ${table} WHERE id_perfil LIKE "%${key}%")
      `;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/searchUser:");
      console.log(err);

      reject(err);
    }
  });
}

async function insertUser(object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} 
        (id_perfil, nome, login, password_hash) 
        VALUES (?, ?, ?, ?)
        RETURNING *
      ;`;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/insertUser:");
      console.log(err);

      reject(err);
    }
  });
}

async function updateUser(object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET id_perfil = ?, nome = ?, login = ?, updated_at = ? 
        WHERE id_usuario = ?
      `;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/updateUser:");
      console.log(err);

      reject(err);
    }
  });
}

async function deleteUser(id) {
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

async function findByProfile(id_perfil) {
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

module.exports = { searchUser, insertUser, updateUser, deleteUser, findByProfile }
