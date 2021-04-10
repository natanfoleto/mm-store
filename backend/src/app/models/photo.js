import { executeQuery } from '../../database/pool.js'

const table = 'fotos_produtos';

class Photo {
  async listPhoto() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM ${table}`;
  
        const result = await executeQuery(query);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from photo.js/listPhoto:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async insertPhoto(object) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `INSERT INTO ${table} 
          (id_produto, nome, path, url) 
          VALUES (?, ?, ?, ?)
          RETURNING *
        ;`;
  
        const binds = Object.values(object);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from photo.js/insertPhoto:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async deletePhoto(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table}  
          WHERE id_foto = ?
        `;
  
        const binds = id;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from photo.js/deletePhoto:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Photo()
