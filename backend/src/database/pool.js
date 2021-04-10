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
  let conn;

  try {
    conn = await pool.getConnection();

    const res = await conn.query(sql, params);
    
    return res;
  } catch (err) {
    
    return err;
  } finally {
    if(conn) conn.release();
  }
}

export { executeQuery }
