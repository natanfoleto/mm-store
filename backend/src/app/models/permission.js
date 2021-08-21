import { executeQuery } from '../../database/pool.js'

const table = 'permissoes'

class Permission {
  async searchPermission (key) {
    try {
      const query = `
        SELECT * FROM ${table}
        WHERE descricao LIKE "%${key}%"
      `

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from permission.js/searchPermissionAll:')
      console.log(err)

      return err
    }
  }

  async searchPermissionForProfile (params) {
    try {
      let query

      console.log(params)

      if ('tipo' in params && 'contexto' in params) {
        query = `
          SELECT permissoes.* FROM ${table}
          LEFT JOIN permissoes_perfis 
          ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
          WHERE permissoes_perfis.id_perfil IS NULL AND permissoes.tipo = '${params.tipo}' AND permissoes.contexto = '${params.contexto}'
        `
      } else if ('tipo' in params) {
        query = `
          SELECT permissoes.* FROM ${table}
          LEFT JOIN permissoes_perfis 
          ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
          WHERE permissoes_perfis.id_perfil IS NULL AND permissoes.tipo = '${params.tipo}'
        `
      } else if ('contexto' in params) {
        query = `
          SELECT permissoes.* FROM ${table}
          LEFT JOIN permissoes_perfis 
          ON (permissoes_perfis.id_permissao = permissoes.id_permissao AND permissoes_perfis.id_perfil = ${params.id_perfil})
          WHERE permissoes_perfis.id_perfil IS NULL AND permissoes.contexto = '${params.contexto}'
        `
      } else {
        query = `
          SELECT permissoes.* FROM ${table}
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

  async insertPermission (object) {
    try {
      const query = `
        INSERT INTO ${table} 
        (nome, tipo, descricao, contexto) 
        VALUES (?, ?, ?, ?)
        RETURNING *
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from permission.js/insertPermission:')
      console.log(err)

      return err
    }
  }

  async updatePermission (object) {
    try {
      const query = `
        UPDATE ${table} 
        SET nome = ?, tipo = ?, descricao = ?, contexto = ?
        WHERE id_permissao = ?
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from permission.js/updatePermission:')
      console.log(err)

      return err
    }
  }

  async deletePermission (id) {
    try {
      const query = `
        DELETE FROM ${table}  
        WHERE id_permissao = ?
      `

      const binds = id

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from permission.js/deletePermission:')
      console.log(err)

      return err
    }
  }
}

export default new Permission()
