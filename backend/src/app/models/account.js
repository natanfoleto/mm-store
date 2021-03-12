const pool = require('../../database/pool');

const table = 'contas';

exports.listAccount = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT ${table}.*, clientes.nome, clientes.cpf
        FROM ${table}
        INNER JOIN clientes ON (clientes.id_cliente = ${table}.id_cliente)
      `;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from account.js/listAccount:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertAccount = async function (id_cliente) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} (
        id_cliente
      ) VALUES (
        ?
      );`;

      const binds = id_cliente;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from account.js/insertAccount:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateAccount = async function (account) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET saldo = ?
        WHERE id_conta = ?
      `;

      const binds = Object.values(account);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from account.js/updateAccount:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteAccount = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_cliente = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from account.js/deleteAccount:");
      console.log(err);

      reject(err);
    }
  });
}
