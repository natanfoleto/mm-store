import { executeQuery } from '../../database/pool.js'

const table = 'clientes';

class Client {
  async listClient() {
    try {
      const query = `SELECT * FROM ${table}`;

      const result = await executeQuery(query);

      return result;
    } catch (err) {
      console.log("Exception from client.js/listClient:");
      console.log(err);

      return err;
    }
  }
  
  async insertClient(object) {
    try {
      const query = `INSERT INTO ${table} 
        (id_endereco, nome, cpf, email, data_nasc, celular, password_hash) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        RETURNING *
      ;`;

      const binds = Object.values(object);

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from client.js/insertClient:");
      console.log(err);

      return err;
    }
  }
  
  async updateClient(object) {
    try {
      const query = `UPDATE ${table} 
        SET nome = ?, cpf = ?, email = ?, data_nasc = ?, celular = ?, password_hash = ?, updated_at = ?
        WHERE id_cliente = ?
      `;

      const binds = Object.values(object);

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from client.js/updateClient:");
      console.log(err);

      return err;
    }
  }
  
  async deleteClient(id) {
    try {
      const query = `DELETE FROM ${table}  
        WHERE id_cliente = ?
        RETURNING id_endereco
      `;

      const binds = id;

      const result = await executeQuery(query, binds);

      return result;
    } catch (err) {
      console.log("Exception from client.js/deleteClient:");
      console.log(err);

      return err;
    }
  }
}

export default new Client()
