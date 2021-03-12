const Product = require('../models/product');
const message = require('../messages/product');

const SQL = require('../helper/SQL');

exports.list = async function (req, res) {
  try {
    const response = await Product.listProduct();

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

exports.create = async function (req, res) {
  try {
    const body = req.body;

    const product = {
      id_categoria: body.id_categoria,
      id_fornecedor: body.id_fornecedor || null,
      nome: body.nome,
      preco_custo: body.preco_custo,
      preco_venda: body.preco_venda,
      preco_promocional: body.preco_promocional || null,
      estoque: body.estoque,
      tamanho: body.tamanho || null
    }

    const response = await Product.insertProduct(product);

    const sqlTreated = await SQL.build(response);

    //! Erro ao executar query no banco
    if (sqlTreated.result === 'error') {

      //! Erro de cadastro duplicado
      if (sqlTreated.errno === 1062) {
        return res.json({
          result: 'error',
          message: message.error.code1.subcode1.message
        })
      }
    }

    //* Query executada com sucesso
    if (sqlTreated.result === 'success') {
      return res.json({
        result: 'success',
        message: message.success.code1.subcode1.message
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

exports.update = async function (req, res) {
  try {
    const body = req.body;

    const product = {
      id_categoria: body.id_categoria,
      id_fornecedor: body.id_fornecedor || null,
      nome: body.nome,
      preco_custo: body.preco_custo,
      preco_venda: body.preco_venda,
      preco_promocional: body.preco_promocional || null,
      estoque: body.estoque,
      tamanho: body.tamanho || null,
      updated_at: new Date(),
      id_produto: body.id_produto
    }

    const response = await Product.updateProduct(product);

    const sqlTreated = await SQL.build(response);

    //! Erro ao executar query no banco
    if (sqlTreated.result === 'error') {

      //! Erro de cadastro duplicado
      if (sqlTreated.errno === 1062) {
        return res.json({
          result: sqlTreated.result,
          message: message.error.code1.subcode1.message
        })
      }
    }

    //* Query executada com sucesso
    if (sqlTreated.result === 'success') {

      //* Nenhum usuário encontrado com os parâmetros passados
      if (sqlTreated.sql.affectedRows === 0) {
        return res.json({
          result: 'error',
          message: message.error.code1.subcode2.message
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

exports.delete = async function (req, res) {
  try {
    const { id_produto } = req.body;

    const response = await Product.deleteProduct(id_produto);

    const sqlTreated = await SQL.build(response);

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
          message: message.error.code1.subcode2.message
        })
      }

      return res.json({
        result: 'success',
        message: message.success.code1.subcode3.message
      });
    }

    return res.json(sqlTreated);
  } catch (err) {

    //! Internal Server Error
    return res.status(400).json({
      result: 'error',
      message: message.error.code1.subcode99.message,
      error: err.toString(),
    });
  }
}
