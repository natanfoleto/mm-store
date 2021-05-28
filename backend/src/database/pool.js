import { createPool } from 'mariadb'

import mariadb from '../config/database/mariadb.js'

const pool = new createPool({
  host: mariadb.host, 
  user: mariadb.user, 
  password: mariadb.password,
  database: mariadb.database,
  connectionLimit: mariadb.connectionLimit,
});
  
async function executeQuery(sql, params = []) {
  return new Promise(async (resolve, reject) => {
    let conn;

    try {
      conn = await pool.getConnection();

      const res = await conn.query(sql, params);
      
      resolve(res);
    } catch (err) {
      
      reject(err);
    } finally {
      if(conn) conn.release();
    }
  });
}

export { executeQuery }
