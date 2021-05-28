import { executeQuery } from '../../database/pool.js'

const table = 'perfis';

class Profile {
  async searchProfile(key) {
    try {
      let query

      if (key !== "")
        query = `SELECT * FROM ${table} WHERE nome LIKE CONCAT("%", ?, "%")`;
      else 
        query = `SELECT * FROM ${table}`;
      
      const binds = key;

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from profile.js/search:");
      console.log(err);

      return err;
    }
  }
  
  async insertProfile(nome) {
    try {
      const query = `INSERT INTO ${table} 
        (nome) 
        VALUES (?)
        RETURNING *
      ;`;

      const binds = nome;

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from profile.js/insertProfile:");
      console.log(err);

      return err;
    }
  }
  
  async updateProfile(nome) {
    try {
      const query = `UPDATE ${table} 
        SET nome = ?, updated_at = ? 
        WHERE id_perfil = ?
      `;

      const binds = Object.values(nome);

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from profile.js/updateProfile:");
      console.log(err);

      return err;
    }
  }
  
  async deleteProfile(id) {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_perfil = ?
      `;

      const binds = id;

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from profile.js/deleteProfile:");
      console.log(err);

      return err;
    }
  }
}

export default new Profile()
