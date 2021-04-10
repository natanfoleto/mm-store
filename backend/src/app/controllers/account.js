import Account from '../models/account.js'
import message from '../messages/account.js'

import SQL from '../helper/SQL.js'

class AccountController {
  async list(req, res) {
    try {
      const response = await Account.listAccount();
  
      return res.json(response);
    } catch (err) {
      
      //! Erro Internal Server
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      });
    }
  }
  
  async create(account) {
    try {
      const response = await insertAccount(account);
  
      const sqlTreated = await SQL(response);
  
      return sqlTreated;
    } catch (err) {
      
      //! Erro Internal Server
      return {
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      };
    }
  }
  
  async update(account) {
    try {
      const response = await Account.update(account);
  
      const sqlTreated = await SQL(response);
  
      return sqlTreated;
    } catch (err) {
      
      //! Erro Internal Server
      return {
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      };
    }
  }
  
  async remove(id) {
    try {
      const response = await Account.deleteAccount(id);
  
      const sqlTreated = await SQL(response);
  
      return sqlTreated;
    } catch (err) {
  
      //! Internal Server Error
      return {
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      };
    }
  }
}

export default new AccountController()
