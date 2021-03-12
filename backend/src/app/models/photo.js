const pool = require('../../database/pool');

const table = 'fotos_produtos';

exports.listPhoto = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from photo.js/listPhoto:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertPhoto = async function (object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} (
        id_produto, nome, path, url
      ) VALUES (
        ?, ?, ?, ?
      );`;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from photo.js/insertPhoto:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deletePhoto = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_foto = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from photo.js/deletePhoto:");
      console.log(err);

      reject(err);
    }
  });
}
