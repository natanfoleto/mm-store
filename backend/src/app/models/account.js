import { executeQuery } from '../../database/pool.js'

const table = 'contas';

class Account {
  async listAccount() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT ${table}.*, clientes.nome, clientes.cpf
          FROM ${table}
          INNER JOIN clientes ON (clientes.id_cliente = ${table}.id_cliente)
        `;
  
        const result = await executeQuery(query);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from account.js/listAccount:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async insertAccount(id_cliente) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${table} 
          (id_cliente) 
          VALUES (?)
          RETURNING *
        ;`;
  
        const binds = id_cliente;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from account.js/insertAccount:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async updateAccount(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${table} 
          SET saldo = ?
          WHERE id_conta = ?
        `;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from account.js/updateAccount:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async deleteAccount(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table}  
          WHERE id_cliente = ?
        `;
  
        const binds = id;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from account.js/deleteAccount:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Account()
