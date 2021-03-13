const pool = require('../../database/pool');

const table = 'enderecos';

exports.listAddress = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * from ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from address.js/listAddress:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertAddress = async function (object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} 
        (id_pessoa, tipo_pessoa, logradouro, numero, cep, bairro, cidade, uf, latitude, longitude) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        RETURNING *
      ;`;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from address.js/insertAddress:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateAddress = async function (object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET logradouro = ?, numero = ?, cep = ?, bairro = ?, cidade = ?, uf = ?, latitude = ?, longitude = ?
        WHERE id_endereco = ?
      `;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from address.js/updateAddress:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteAddress = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_endereco = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from address.js/deleteAddress:");
      console.log(err);

      reject(err);
    }
  });
}

