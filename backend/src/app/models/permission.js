import { executeQuery } from '../../database/pool.js'

class Permission {
  async selectCountPermission (params) {
    try {
      const query = `
        SELECT id_permissao as id FROM permissoes WHERE nome = ?
      `

      const result = await executeQuery(query, params)

      return result[0]
    } catch (err) {
      return err
    }
  }

  async searchPermission (key) {
    try {
      const query = `
        SELECT * FROM permissoes
        WHERE descricao LIKE "%${key}%"
      `

      const result = await executeQuery(query)

      return result
    } catch (err) {
      return err
    }
  }

  async searchPermissionForProfile (params) {
    try {
      let query

      if ('tipo' in params && 'contexto' in params) {
        query = `
          SELECT permissoes.* FROM permissoes
          LEFT JOIN permissoes_perfis 
          ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
          WHERE permissoes_perfis.id_perfil IS NULL AND permissoes.tipo = '${params.tipo}' AND permissoes.contexto = '${params.contexto}'
        `
      } else if ('tipo' in params) {
        query = `
          SELECT permissoes.* FROM permissoes
          LEFT JOIN permissoes_perfis 
          ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
          WHERE permissoes_perfis.id_perfil IS NULL AND permissoes.tipo = '${params.tipo}'
        `
      } else if ('contexto' in params) {
        query = `
          SELECT permissoes.* FROM permissoes
          LEFT JOIN permissoes_perfis 
          ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
          WHERE permissoes_perfis.id_perfil IS NULL AND permissoes.contexto = '${params.contexto}'
        `
      } else {
        query = `
          SELECT permissoes.* FROM permissoes
          LEFT JOIN permissoes_perfis ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
          WHERE permissoes_perfis.id_perfil IS NULL
        `
      }

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from permission.js/searchPermission:')
      console.log(err)

      return err
    }
  }

  async insertPermission (params) {
    try {
      const query = `
        INSERT INTO permissoes 
        (nome, tipo, descricao, contexto) 
        VALUES (?, ?, ?, ?)
        RETURNING *
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async updatePermission (params) {
    try {
      const query = `
        UPDATE permissoes 
        SET nome = ?, tipo = ?, descricao = ?, contexto = ?
        WHERE id_permissao = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }

  async deletePermission (params) {
    try {
      const query = `
        DELETE FROM permissoes  
        WHERE id_permissao = ?
      `

      const result = await executeQuery(query, params)

      return result
    } catch (err) {
      return err
    }
  }
}

export default new Permission()
