import Account from '../models/account.js'
import calcOffset from '../utils/offset.js'
import message from '../messages/account.js'

class AccountController {
  async search (req, res) {
    try {
      const { key } = req.body
      const { page, limit } = req.params

      const offset = await calcOffset(page, limit)

      const response = await Account.searchAccount(key, limit, offset)

      return res.json(response)
    } catch (err) {
      //! Erro Internal Server
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }

  async searchOne (req, res) {
    try {
      const { id_cliente } = req.body

      const response = await Account.searchOneAccount(id_cliente)

      return res.json(response)
    } catch (err) {
      //! Erro Internal Server
      return res.json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString()
      })
    }
  }
}

export default new AccountController()
