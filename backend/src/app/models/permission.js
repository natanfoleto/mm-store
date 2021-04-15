import { executeQuery } from '../../database/pool.js'

const table = 'permissoes';

class Permission {
  async searchPermissionAll(params) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `
          SELECT permissoes.* FROM ${table}
          LEFT JOIN permissoes_perfis ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
          WHERE permissoes_perfis.id_permissao_perfil IS NULL
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

  async searchPermission(params) {
    return new Promise(async (resolve, reject) => {
      try {
        let query;
        
        if ('tipo' in params && 'contexto' in params) {
          query = `
            SELECT permissoes.* FROM ${table}
            LEFT JOIN permissoes_perfis 
            ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
            WHERE permissoes_perfis.id_permissao_perfil IS NULL AND permissoes.tipo = '${params.tipo}' AND permissoes.contexto = '${params.contexto}'
          `;
        } else if ('tipo' in params) {
          query = `
            SELECT permissoes.* FROM ${table}
            LEFT JOIN permissoes_perfis 
            ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
            WHERE permissoes_perfis.id_permissao_perfil IS NULL AND permissoes.tipo = '${params.tipo}'
          `;
        } else if ('contexto' in params) {
          query = `
            SELECT permissoes.* FROM ${table}
            LEFT JOIN permissoes_perfis 
            ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
            WHERE permissoes_perfis.id_permissao_perfil IS NULL AND permissoes.contexto = '${params.contexto}'
          `;
        }
  
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
