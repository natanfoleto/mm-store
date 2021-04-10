import { executeQuery } from '../../database/pool.js'

const table = 'categorias';

class Category {
  async listCategory() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM ${table}`;
  
        const result = await executeQuery(query);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from category.js/listCategory:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async insertCategory(nome) {
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
        console.log("Exception from category.js/insertCategory:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async updateCategory(nome) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `UPDATE ${table} 
          SET nome = ?, updated_at = ? 
          WHERE id_categoria = ?
        `;
  
        const binds = Object.values(nome);
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from category.js/updateCategory:");
        console.log(err);
  
        reject(err);
      }
    });
  }
  
  async deleteCategory(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `DELETE FROM ${table}  
          WHERE id_categoria = ?
        `;
  
        const binds = id;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from category.js/deleteCategory:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Category()
