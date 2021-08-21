import { executeQuery } from '../../database/pool.js'

const table = 'contas'

class Account {
  async listAccount () {
    try {
      const query = `
        SELECT ${table}.*, clientes.nome, clientes.cpf
        FROM ${table}
        INNER JOIN clientes ON (clientes.id_cliente = ${table}.id_cliente)
      `

      const result = await executeQuery(query)

      return result
    } catch (err) {
      console.log('Exception from account.js/listAccount:')
      console.log(err)

      return err
    }
  }

  async insertAccount (id_cliente) {
    try {
      const query = `
        INSERT INTO ${table} 
        (id_cliente) 
        VALUES (?)
        RETURNING *
      `

      const binds = id_cliente

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from account.js/insertAccount:')
      console.log(err)

      return err
    }
  }

  async updateAccount (object) {
    try {
      const query = `
        UPDATE ${table} 
        SET saldo = ?
        WHERE id_conta = ?
      `

      const binds = Object.values(object)

      const result = await executeQuery(query, binds)

      return result
    } catch (err) {
      console.log('Exception from account.js/updateAccount:')
      console.log(err)

      return err
    }
  }
}

export default new Account()
