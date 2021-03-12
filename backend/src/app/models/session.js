const pool = require('../../database/pool');

exports.findUser = async function (login) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = `SELECT * FROM usuarios
        WHERE login = ?
      `;

      const binds = login;

      const result = await pool.execute(query, binds);

      resolve(result);
    } catch (err) {
      console.log("Exception from session.js/findUser:");
      console.log(err);

      reject(err);
    }
  });
}
