const { createPool } = require('mariadb');

const mariadb = require('../config/database/mariadb');

const pool = new createPool({
  host: mariadb.host, 
  user: mariadb.user, 
  password: mariadb.password,
  database: mariadb.database,
  connectionLimit: mariadb.connectionLimit,
});
  
async function execute(sql, params = []) {
  let conn;

  try {
    conn = await pool.getConnection();

    const res = await conn.query(sql, params);
    
    return res;
  } catch (err) {
    console.log("Exception from pool.js/execute:");
    console.log(err);
    
    return err;
  } finally {
    if(conn) conn.release();
  }
}

module.exports.execute = execute;
