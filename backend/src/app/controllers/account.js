import Account from '../models/account.js'
import pagingData from '../utils/pagingData.js'
import message from '../messages/account.js'

class AccountController {
  async search (req, res) {
    try {
      const { key } = req.body

      const response = await Account.searchAccount(key || '')

      const pagedData = await pagingData(response, req.params)

      return res.json(pagedData)
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
