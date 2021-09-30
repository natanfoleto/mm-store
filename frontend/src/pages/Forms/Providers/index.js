import { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

import Layout from '../../Layouts/default';

import providerService from '../../../services/api/provider';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'

import { Container, Footer, Title, Grouping, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormProduct() {
  const history = useHistory();

  const { createProvider, updateProvider } = providerService();

  const [provider, setProvider] = useState();
  const [document, setDocument] = useState('');
  const [celular, setCelular] = useState('');
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  
  const [documentType, setDocumentType] = useState('cpf');
  const [inputCPF, setInputCPF] = useState({ display: 'flex' });
  const [inputCNPJ, setInputCNPJ] = useState({ display: 'none' });
  const [buttonCPF, setButtonCPF] = useState({ borderBottom: '1px solid #000' });
  const [buttonCNPJ, setButtonCNPJ] = useState({ borderBottom: '1px solid #000' });
  
  useEffect(() => {
    if (history.location.pathname === '/fornecedores/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');

      const state = history.location.state

      if (!state) history.goBack()

      if (state.cpf_cnpj.length > 14)
        handleDocument('cnpj')

      setProvider(state);
      setDocument(state.cpf_cnpj)
      setCelular(state.celular)
    }
  }, [history])

  async function handleSubmit(data) {
    const tam = document.length

    if (documentType === 'cpf' && tam !== 14) {
      alert('Tamanho inválido de CPF!')
      return
    }

    if (documentType === 'cnpj' && tam !== 18) {
      alert('Tamanho inválido de CNPJ!')
      return
    }
      
    data.cpf_cnpj = document
    delete data.cpf 
    delete data.cnpj
    
    if (operation === 'ADD') {
      delete data.id_fornecedor
      
      await createProvider(data)
    } else {
      await updateProvider(data);
    }
  }

  function handleCancel() {
    history.goBack()
  }

  function handleDocument(opt) {
    setDocument('')
    setDocumentType(opt)

    if (opt === 'cpf') {
      setInputCPF({ display: 'flex' })
      setInputCNPJ({ display: 'none' })
      setButtonCPF({ borderBottom: '1px solid #0052CC' })
      setButtonCNPJ({ borderBottom: '1px solid #DDD' })
    }

    if (opt === 'cnpj') {
      setInputCPF({ display: 'none' })
      setInputCNPJ({ display: 'flex' })
      setButtonCPF({ borderBottom: '1px solid #DDD' })
      setButtonCNPJ({ borderBottom: '1px solid #0052CC' })
    }
  }

  return (
    <Layout 
      background="#F1F1F1"
      title={operation === 'ADD' ? 'Novo fornecedor' : `Editando: ${provider && provider.nome}`}
    >
      <Container>
        <Form initialData={provider} onSubmit={handleSubmit} autoComplete="off">
          <Title>
            <h1> { operation === 'ADD' ? 'Novo fornecedor' : 'Editar fornecedor' }</h1>
          </Title>
          
          <Input 
            type="text" 
            name="id_fornecedor"
            hidden={true}
          />
          
          <InputGroup>
            <Label>Nome</Label>

            <Input 
              type="text" 
              name="nome"
              maxLength={100}
              onChange={() => { setButtonAvailable(false) }}
              required
            />
          </InputGroup>

          <Grouping>
            <InputGroup>
              <Label>
                <button 
                  type="button"
                  tabIndex="-1"
                  style={buttonCPF}
                  onClick={() => { handleDocument('cpf') }}
                > 
                  CPF
                </button>
                  &nbsp;
                <button 
                  type="button"
                  tabIndex="-1"
                  style={buttonCNPJ}
                  onClick={() => { handleDocument('cnpj') }}
                >
                  CNPJ
                </button>
              </Label>

              <InputMask 
                type="text"
                name="cpf"
                value={document}
                mask={'999.999.999-99'}
                maskChar={null}
                style={inputCPF}
                onChange={(e) => { 
                  setButtonAvailable(false) 
                  setDocument(e.target.value)
                }}
              >
                {(inputProps) => ( <Input {...inputProps} /> )}
              </InputMask>

              <InputMask 
                type="text"
                name="cnpj"
                value={document}
                mask={'99.999.999/9999-99'}
                maskChar={null}
                style={inputCNPJ}
                onChange={(e) => { 
                  setButtonAvailable(false) 
                  setDocument(e.target.value)
                }}
              >
                {(inputProps) => ( <Input {...inputProps} /> )}
              </InputMask>
            </InputGroup>

            <InputGroup>
              <Label>E-mail</Label>

              <Input 
                type="email" 
                name="email"
                maxLength={50}
                onChange={() => { setButtonAvailable(false) }}
                required
              />
            </InputGroup>
          </Grouping>

          <Grouping>
            <InputGroup>
              <Label>Celular</Label>

              <InputMask 
                type="text" 
                name="celular"
                value={celular}
                mask="(99) 99999-9999"
                maskChar={null}
                onChange={(e) => { 
                  setButtonAvailable(false) 
                  setCelular(e.target.value)
                }}
              >
                {(inputProps) => ( <Input {...inputProps} /> )}
              </InputMask>
            </InputGroup>

            <InputGroup>
              <Label>Observações</Label>

              <Input 
                type="text" 
                name="obs"
                maxLength={200}
                onChange={() => { setButtonAvailable(false) }}
              />
            </InputGroup>
          </Grouping>

          <ButtonGroup>
            <Button
              type="submit"
              background="#0052CC"
              color="#FFF"
              disabled={buttonAvailable}
            >
              { operation === 'ADD' ? 'SALVAR' : 'ATUALIZAR' }
            </Button>
          </ButtonGroup>
        </Form>

        <Footer>
          <Button
            type="button"
            background="#FFCC01"
            color="#FFF"
            fontWeight="bold"
            border="1px solid #FFCC01"
            onClick={handleCancel}
          >
            VOLTAR
          </Button>
        </Footer>
      </Container>
    </Layout>
  );
}
 