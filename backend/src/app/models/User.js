import { executeQuery } from '../../database/pool.js'

class User {
  async selectCountUser (params) {
    try {
      const query = `
        SELECT id_usuario as id FROM usuarios WHERE login = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchUser (key, limit, offset) {
    try {
      const cWhere = `
        INNER JOIN perfis AS pf ON us.id_perfil = pf.id_perfil
        WHERE us.nome LIKE "%${key}%" OR us.login LIKE "%${key}%"
      `

      const queryCount = `
        SELECT COUNT(id_usuario) AS count FROM usuarios us
        ${cWhere}
      `

      const query = `
        SELECT us.*, pf.nome AS perfil 
        FROM usuarios AS us 
        ${cWhere}
        LIMIT ${limit}
        OFFSET ${offset}
      `

      const [{ count }] = await executeQuery(queryCount)
      const data = await executeQuery(query)

      return { data, total: count }
    } catch (err) {
      return err
    }
  }

  async insertUser (params) {
    try {
      const query = `
        INSERT INTO usuarios 
        (id_perfil, nome, login, password_hash) 
        VALUES (?, ?, ?, ?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async updateUser (params) {
    try {
      const query = `
        UPDATE usuarios 
        SET id_perfil = ?, nome = ?, login = ?, updated_at = ? 
        WHERE id_usuario = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deleteUser (params) {
    try {
      const query = `
        DELETE FROM usuarios 
        WHERE id_usuario = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async findUserByProfile (params) {
    try {
      const query = `
        SELECT * FROM usuarios
        WHERE id_perfil = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new User()
