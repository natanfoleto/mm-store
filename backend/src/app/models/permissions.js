import { executeQuery } from '../../database/pool.js'

const table = 'permissoes_perfis';

class Permissions {
  async searchPermissions(key) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `
          (
            SELECT * 
            FROM ${table} 
            WHERE id_perfil LIKE "%${key}%"
          )
          UNION
          (
            SELECT * 
            FROM ${table} 
            WHERE id_permissao LIKE "%${key}%"
          )
        `;
  
        const result = await executeQuery(query);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from permissions.js/listPermissions:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async insertPermissions(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${table} 
          (id_perfil, id_permissao) 
          VALUES (?, ?)
          RETURNING *
        ;`;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from permissions.js/insertPermissions:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async updatePermissions(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${table} 
          SET id_perfil = ?, id_permissao = ?
          WHERE id_permissao_perfil = ?
        `;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from permissions.js/updatePermissions:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async deletePermissions(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table}  
          WHERE id_permissao_perfil = ?
        `;
  
        const binds = id;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from permissions.js/deletePermissions:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Permissions()
