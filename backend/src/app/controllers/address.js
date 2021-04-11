import Address from '../models/address.js'
import message from '../messages/address.js'

import SQL from '../helper/SQL.js'

class AddressController {
  async list(req, res) {
    try {
      const response = await Address.listAddress();
  
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
  
  async update(req, res) {
    try {
      const body = req.body;
  
      const address = {
        logradouro: body.logradouro,
        numero: body.numero,
        cep: body.cep || null,
        bairro: body.bairro || null,
        cidade: body.cidade,
        uf: body.uf,
        latitude: body.latitude || null,
        longitude: body.longitude || null,
        id_endereco: body.id_endereco
      }
  
      const response = await Address.updateAddress(address);
  
      const sqlTreated = await SQL(response);
  
      //! Erro ao executar query no banco
      if (sqlTreated.result === 'error') {
        return res.json(sqlTreated)
      }
  
      //* Query executada com sucesso
      if (sqlTreated.result === 'success') {
  
        //* Nenhum usuário encontrado com os parâmetros passados
        if (sqlTreated.sql.affectedRows === 0) {
          return res.json({
            result: 'error',
            message: message.error.code1.subcode1.message
          })
        }
  
        return res.json({
          result: sqlTreated.result,
          message: message.success.code1.subcode2.message
        })
      }
  
      return res.json(sqlTreated);
    } catch (err) {
  
      //! Erro Internal Server
      return res.status(400).json({
        result: 'error',
        message: message.error.code1.subcode99.message,
        error: err.toString(),
      });
    }
  }
}

export default new AddressController()
