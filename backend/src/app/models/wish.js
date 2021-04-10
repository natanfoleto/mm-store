import { executeQuery } from '../../database/pool.js'

const table = 'pedidos';

class Wish {
  async listWish() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM ${table}`;
  
        const result = await executeQuery(query);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from wish.js/listWish:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async insertWish(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${table} 
          (id_cliente, descricao, url_foto) 
          VALUES (?, ?, ?)
          RETURNING *
        ;`;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from wish.js/insertWish:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async updateWish(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${table} 
          SET descricao = ?, url_foto = ?
          WHERE id_pedido = ?
        `;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from wish.js/updateWish:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async deleteWish(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table}  
          WHERE id_pedido = ?
        `;
  
        const binds = id;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from wish.js/deleteWish:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Wish()
