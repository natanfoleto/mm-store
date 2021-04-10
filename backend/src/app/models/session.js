import { executeQuery } from '../../database/pool.js'

class Session {
  async findUser(login) {
    return new Promise(async (resolve, reject) => {
      try {
        const query = `SELECT * FROM usuarios
          WHERE login = ?
        `;
  
        const binds = login;
  
        const result = await executeQuery(query, binds);
  
        resolve(result);
      } catch (err) {
        console.log("Exception from session.js/findUser:");
        console.log(err);
  
        reject(err);
      }
    });
  }
}

export default new Session()
