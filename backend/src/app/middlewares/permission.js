import { decode } from 'jsonwebtoken'

import Permissions from '../models/permissions.js'

import SQL from '../../lib/SQL.js'

async function decoder (req) {
  const authHeader = req.headers.authorization

  const [, token] = authHeader?.split(' ')

  const { id_usuario } = decode(token)

  const response = await Permissions.userFindPermissions(id_usuario)

  const sqlTreated = await SQL(response)

  const { sql } = sqlTreated

  const permissions = sql.map((item) => {
    return item.nome
  })

  return permissions
}

function is (profile) {
  const profileAuthorized = async (req, res, next) => {
    const userPermissions = await decoder(req)

    if (userPermissions.includes('ALL_PERMISSIONS')) {
      return next()
    }

    const existsPermission = userPermissions?.some(p => profile.includes(p))

    if (existsPermission) {
      return next()
    }

    return res.status(403).json({
      result: 'error',
      message: 'Ação bloqueada! Este usuário não tem permissão.'
    })
  }

  return profileAuthorized
}

export { is }
