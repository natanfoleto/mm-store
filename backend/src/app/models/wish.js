const pool = require('../../database/pool');

const table = 'pedidos';

exports.listWish = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from wish.js/listWish:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertWish = async function (object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} (
        id_cliente, descricao, url_foto
      ) VALUES (
        ?, ?, ?
      );`;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from wish.js/insertWish:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateWish = async function (object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET descricao = ?, url_foto = ?
        WHERE id_pedido = ?
      `;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from wish.js/updateWish:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteWish = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_pedido = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from wish.js/deleteWish:");
      console.log(err);

      reject(err);
    }
  });
}
