import { executeQuery } from '../../database/pool.js'

const table = 'usuarios';

class User {
  async searchUser(key) {
    try {
      const query = `
        (
          SELECT us.*, pf.nome AS perfil 
          FROM ${table} AS us 
          INNER JOIN perfis AS pf 
          ON us.id_perfil = pf.id_perfil
          WHERE us.nome LIKE "%${key}%"
        )
        UNION
        (
          SELECT us.*, pf.nome AS perfil 
          FROM ${table} AS us 
          INNER JOIN perfis AS pf 
          ON us.id_perfil = pf.id_perfil
          WHERE us.login LIKE "%${key}%"
        )
        UNION
        (
          SELECT us.*, pf.nome AS perfil 
          FROM ${table} AS us 
          INNER JOIN perfis AS pf 
          ON us.id_perfil = pf.id_perfil
          WHERE us.id_perfil LIKE "%${key}%"
        )
      `;

      const result = await executeQuery(query);

      return result;
    } catch (err) {
      console.log("Exception from user.js/searchUser:");
      console.log(err);

      return err;
    }
  }
  
  async insertUser(object) {
    try {
      const query = `INSERT INTO ${table} 
        (id_perfil, nome, login, password_hash) 
        VALUES (?, ?, ?, ?)
        RETURNING *
      ;`;

      const binds = Object.values(object);

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from user.js/insertUser:");
      console.log(err);

      return err;
    }
  }
  
  async updateUser(object) {
    try {
      const query = `UPDATE ${table} 
        SET id_perfil = ?, nome = ?, login = ?, updated_at = ? 
        WHERE id_usuario = ?
      `;

      const binds = Object.values(object);

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from user.js/updateUser:");
      console.log(err);

      return err;
    }
  }
  
  async deleteUser(id) {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_usuario = ?
      `;

      const binds = id;

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from user.js/deleteUser:");
      console.log(err);

      return err;
    }
  }
  
  async findUserByProfile(id_perfil) {
    try {
      const query = `SELECT * FROM ${table}
        WHERE id_perfil = ?
      `;

      const binds = id_perfil;

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from user.js/findByProfile:");
      console.log(err);

      return err;
    }
  }
}

export default new User()
