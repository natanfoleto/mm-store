import { executeQuery } from '../../database/pool.js'

class Permissions {
  async selectCountPermissions (params) {
    try {
      const query = `
        SELECT COUNT(id_perfil) as count 
        FROM permissoes_perfis 
        WHERE id_perfil = ? AND id_permissao = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchPermissions (params) {
    try {
      const query = `
        SELECT permissoes_perfis.*, permissoes.tipo, permissoes.descricao, permissoes.contexto
        FROM permissoes_perfis 
        INNER JOIN permissoes ON (permissoes.id_permissao = permissoes_perfis.id_permissao)
        WHERE id_perfil = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async insertPermissions (object) {
    try {
      const query = `
        INSERT INTO permissoes_perfis 
        (id_perfil, id_permissao) 
        VALUES (?, ?)
        RETURNING *
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from permissions.js/insertPermissions:')
      console.log(err)

      return err
    }
  }

  async deletePermissions (params) {
    try {
      const query = `
        DELETE FROM permissoes_perfis  
        WHERE id_permissao_perfil = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async userFindPermissions (id_usuario) {
    try {
      const query = `
        SELECT pm.* FROM usuarios us
        INNER JOIN permissoes_perfis pp ON (us.id_perfil = pp.id_perfil)
        INNER JOIN permissoes pm ON (pp.id_permissao = pm.id_permissao)
        WHERE id_usuario = ?
      `

      const binds = id_usuario

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from session.js/userFindPermissions:')
      console.log(err)

      return err
    }
  }
}

export default new Permissions()
