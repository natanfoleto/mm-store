const pool = require('../../database/pool');

const table = 'categorias';

exports.listCategory = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from category.js/listCategory:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertCategory = async function (nome) {
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
      console.log("Exception from category.js/insertCategory:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateCategory = async function (nome) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET nome = ?, updated_at = ? 
        WHERE id_categoria = ?
      `;

      const binds = Object.values(nome);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from category.js/updateCategory:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteCategory = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_categoria = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from category.js/deleteCategory:");
      console.log(err);

      reject(err);
    }
  });
}
