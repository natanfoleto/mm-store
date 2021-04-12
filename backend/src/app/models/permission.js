import { executeQuery } from '../../database/pool.js'

const table = 'permissoes';

class Permission {
  async searchPermission(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `
          (
            SELECT * 
            FROM ${table} 
            WHERE tipo LIKE "%${key}%"
          )
          UNION
          (
            SELECT * 
            FROM ${table} 
            WHERE descricao LIKE "%${key}%"
          )
          UNION
          (
            SELECT * 
            FROM ${table} 
            WHERE contexto LIKE "%${key}%"
          )
        `;
  
        const result = await executeQuery(query);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from permission.js/listPermission:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async insertPermission(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${table} 
          (tipo, descricao, contexto) 
          VALUES (?, ?, ?)
          RETURNING *
        ;`;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from permission.js/insertPermission:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async updatePermission(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${table} 
          SET tipo = ?, descricao = ?, contexto = ?
          WHERE id_permissao = ?
        `;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from permission.js/updatePermission:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async deletePermission(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table}  
          WHERE id_permissao = ?
        `;
  
        const binds = id;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from permission.js/deletePermission:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Permission()
