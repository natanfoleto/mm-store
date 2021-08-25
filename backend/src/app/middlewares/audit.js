import { decode } from 'jsonwebtoken'

import Audit from '../models/audit.js'

async function decoder (req) {
  const authHeader = req.headers.authorization

  const [, token] = authHeader?.split(' ')

  const user = decode(token)

  return user
}

export default async function index (req, res, next) {
  try {
    const user = await decoder(req)

    const audit = {
      login: user.login,
      route: req.originalUrl,
      method: req.method,
      body: req.body,
      moment: new Date()
    }

    await Audit.insertAudit(audit)

    return next()
  } catch (err) {
    console.log(err)
    return res.json({
      result: 'error',
      message: err
    })
  }
};
