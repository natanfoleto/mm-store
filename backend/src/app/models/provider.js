const pool = require('../../database/pool');

const table = 'fornecedores';

exports.listProvider = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from provider.js/listProvider:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertProvider = async function (object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} (
        nome, cpf_cnpj, email, celular, obs
      ) VALUES (
        ?, ?, ?, ?, ?
      );`;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from provider.js/insertProvider:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateProvider = async function (object) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET nome = ?, cpf_cnpj = ?, email = ?, celular = ?, obs = ?, updated_at = ?
        WHERE id_fornecedor = ?
      `;

      const binds = Object.values(object);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from provider.js/updateProvider:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteProvider = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_fornecedor = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from provider.js/deleteProvider:");
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
