const pool = require('../../database/pool');

const table = 'clientes';

exports.listClient = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from client.js/listClient:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertClient = async function (client) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} (
        nome, cpf, email, data_nasc, celular, password_hash
      ) VALUES (
        ?, ?, ?, ?, ?, ?
      );`;

      const binds = Object.values(client);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from client.js/insertClient:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateClient = async function (client) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET nome = ?, cpf = ?, email = ?, data_nasc = ?, celular = ?, password_hash = ?, updated_at = ?
        WHERE id_cliente = ?
      `;

      const binds = Object.values(client);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from client.js/updateClient:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteClient = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_cliente = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from client.js/deleteClient:");
      console.log(err);

      reject(err);
    }
  });
}

exports.findByAddress = async function (id_endereco) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}
        WHERE id_endereco = ?
      `;

      const binds = id_endereco;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from user.js/findByAddress:");
      console.log(err);

      reject(err);
    }
  });
}
