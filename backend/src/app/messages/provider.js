export default {
  success: {
    code1: {
      subcode1: {
        message: 'Fornecedor cadastrado com sucesso'
      },
      subcode2: {
        message: 'Fornecedor atualizado com sucesso'
      },
      subcode3: {
        message: 'Fornecedor deletado com sucesso'
      }
    }
  },
  error: {
    code1: {
      subcode1: {
        message: 'Já existe um fornecedor com este email, CPF ou CNPJ'
      },
      subcode2: {
        message: 'Nenhum fornecedor foi encontrado'
      },
      subcode3: {
        message: 'Existem produtos atrelados a este fornecedor'
      },
      subcode99: {
        message: 'Internal Server Error'
      }
    }
  }
}
