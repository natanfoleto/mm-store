import { executeQuery } from '../../database/pool.js'

const table = 'perfis';

class Profile {
  async searchProfile(nome) {
    return new Promise(async (resolve, reject) => {
      try {
        let query

        if (nome !== "")
          query = `SELECT * FROM ${table} WHERE nome LIKE CONCAT("%", ?, "%")`;
        else 
          query = `SELECT * FROM ${table}`;
        
        const binds = nome;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from profile.js/searchProfile:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async insertProfile(nome) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${table} 
          (nome) 
          VALUES (?)
          RETURNING *
        ;`;
  
        const binds = nome;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from profile.js/insertProfile:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async updateProfile(nome) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${table} 
          SET nome = ?, updated_at = ? 
          WHERE id_perfil = ?
        `;
  
        const binds = Object.values(nome);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from profile.js/updateProfile:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async deleteProfile(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table}  
          WHERE id_perfil = ?
        `;
  
        const binds = id;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from profile.js/deleteProfile:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Profile()
