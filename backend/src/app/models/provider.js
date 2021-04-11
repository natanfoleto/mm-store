import { executeQuery } from '../../database/pool.js'

const table = 'fornecedores';

class Provider {
  async listProvider() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM ${table}`;
  
        const result = await executeQuery(query);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from provider.js/listProvider:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async insertProvider(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${table} 
          (id_endereco, nome, cpf_cnpj, email, celular, obs) 
          VALUES (?, ?, ?, ?, ?, ?)
          RETURNING *
        ;`;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from provider.js/insertProvider:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async updateProvider(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${table} 
          SET nome = ?, cpf_cnpj = ?, email = ?, celular = ?, obs = ?, updated_at = ?
          WHERE id_fornecedor = ?
        `;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from provider.js/updateProvider:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async deleteProvider(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table}  
          WHERE id_fornecedor = ?
          RETURNING id_endereco
        `;
  
        const binds = id;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from provider.js/deleteProvider:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Provider()
