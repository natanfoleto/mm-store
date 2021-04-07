const pool = require('../../database/pool');

const table = 'perfis';

async function searchProfile(nome) {
  return new Promise(async (resolve, reject) => {
    try {
      if (nome !== "")
        query = `SELECT * FROM ${table} WHERE nome LIKE CONCAT("%", ?, "%")`;
      else 
        query = `SELECT * FROM ${table}`;
      
      const binds = nome;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from profile.js/searchProfile:");
      console.log(err);

      reject(err);
    }
  });
}

async function insertProfile(nome) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} 
        (nome) 
        VALUES (?)
        RETURNING *
      ;`;

      const binds = nome;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from profile.js/insertProfile:");
      console.log(err);

      reject(err);
    }
  });
}

async function updateProfile(nome) {
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
      console.log("Exception from profile.js/updateProfile:");
      console.log(err);

      reject(err);
    }
  });
}

async function deleteProfile(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_perfil = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from profile.js/deleteProfile:");
      console.log(err);

      reject(err);
    }
  });
}

module.exports = { searchProfile, insertProfile, updateProfile, deleteProfile }
