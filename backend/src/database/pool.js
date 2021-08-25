import { createPool } from 'mariadb'

import env from '../lib/configLoader.js'

const pool = new createPool({
  host: env.API_BACKEND_MDB_HOST,
  user: env.API_BACKEND_MDB_USER,
  password: env.API_BACKEND_MDB_PASSWORD.toString(),
  database: env.API_BACKEND_MDB_DATABASE,
  connectionLimit: env.API_BACKEND_MDB_CONNECTION_LIMIT
})

async function executeQuery (sql, params = []) {
  let conn

  try {
    conn = await pool.getConnection()

    const res = await conn.query(sql, params)

    return res
  } catch (err) {
    console.log(err)
    return err
  } finally {
    if (conn) conn.release()
  }
}

export { executeQuery }
