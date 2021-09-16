import { useEffect, useState } from 'react'; 

import { useHistory } from 'react-router-dom';

import Layout from '../../Layouts/default';

import providerService from '../../../services/api/provider';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'

import { Container, Title, Grouping, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormProduct() {
  const history = useHistory();

  const { createProvider, updateProvider } = providerService();

  const [provider, setProvider] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    if (history.location.pathname === '/fornecedores/add') {
      setOperation('ADD');
    }
    else {
      const state = JSON.parse(history.location.state)

      setProvider(state);
      setOperation('EDIT');
    }
  }, [history])

  async function handleSubmit(data) {
    console.log(data)
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

  return (
    <Layout title={operation === 'ADD' ? 'Novo fornecedor' : `Editando: ${provider && provider.nome}`}>  
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
              <Label>CPF / CNPJ</Label>

              <Input 
                type="text" 
                name="cpf_cnpj"
                maxLength={15}
                onChange={() => { setButtonAvailable(false) }}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>E-mail</Label>

              <Input 
                type="text" 
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

              <Input 
                type="text" 
                name="celular"
                maxLength={15}
                onChange={() => { setButtonAvailable(false) }}
                required
              />
            </InputGroup>

            <InputGroup>
              <Label>Observações</Label>

              <Input 
                type="text" 
                name="obs"
                maxLength={200}
                onChange={() => { setButtonAvailable(false) }}
                required
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
              Salvar
            </Button>

            <Button
              type="button"
              background="#FFF"
              color="#777"
              border="1px solid #ccc"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </ButtonGroup>
        </Form>
      </Container>
    </Layout>
  );
}
 