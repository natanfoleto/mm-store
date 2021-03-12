const pool = require('../../database/pool');

const table = 'produtos';

exports.listProduct = async function () {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await pool.execute(query);

      resolve(result);
    } catch (err) {
      console.log("Exception from product.js/listProduct:");
      console.log(err);

      reject(err);
    }
  });
}

exports.insertProduct = async function (product) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `INSERT INTO ${table} (
        id_categoria, id_fornecedor, nome, preco_custo, preco_venda, preco_promocional, estoque, tamanho
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
      );`;

      const binds = Object.values(product);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from product.js/insertProduct:");
      console.log(err);

      reject(err);
    }
  });
}

exports.updateProduct = async function (product) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `UPDATE ${table} 
        SET id_categoria = ?, id_fornecedor = ?, nome = ?, preco_custo = ?, preco_venda = ?, preco_promocional = ?, estoque = ?, tamanho = ?, updated_at = ?
        WHERE id_produto = ?
      `;

      const binds = Object.values(product);

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from product.js/updateProduct:");
      console.log(err);

      reject(err);
    }
  });
}

exports.deleteProduct = async function (id) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_produto = ?
      `;

      const binds = id;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from product.js/deleteProduct:");
      console.log(err);

      reject(err);
    }
  });
}

exports.findByCategory = async function (id_category) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}
        WHERE id_categoria = ?
      `;

      const binds = id_category;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from product.js/findByCategory:");
      console.log(err);

      reject(err);
    }
  });
}

exports.findByProvider = async function (id_provider) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM ${table}
        WHERE id_fornecedor = ?
      `;

      const binds = id_provider;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from product.js/findByProvider:");
      console.log(err);

      reject(err);
    }
  });
}
