import { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

import Layout from '../../Layouts/default';

import clientService from '../../../services/api/client';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { Container, Title, InputGroup, Grouping, ButtonGroup, Label } from '../styles';

export default function FormUser() {
  const history = useHistory();

  const { createClient, updateClient } = clientService();

  const [client, setClient] = useState();
  const [date, setDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    if (history.location.pathname === '/clientes/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');

      const state = history.location.state;

      setClient(state);
      
      const date = new Date(state.data_nasc);
      date.setDate(date.getDate() + 3);
      const dateInput = date.toISOString().substr(0,10);

      setDate(dateInput);
      setCpf(state.cpf);
      setCelular(state.celular);
    }
  }, [history])

  async function handleSubmit(data) {
    if (operation === 'ADD') {
      delete data.id_cliente;

      await createClient(data)
    } else {
      delete data.password

      await updateClient(data);
    }
  }

  function handleCancel() {
    history.goBack()
  }

  return (
    <Layout title={operation === 'ADD' ? 'Novo cliente' : `Editando: ${client && client.nome}`}>
      <Container>
        <Form initialData={client} onSubmit={handleSubmit} autoComplete="off">
          <Title>
            <h1> { operation === 'ADD' ? 'Novo cliente' : 'Editar cliente' }</h1>
          </Title>
          
          <Input 
            type="text" 
            name="id_cliente"
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
              <Label>CPF</Label>

              <InputMask 
                type="text" 
                name="cpf"
                value={cpf}
                mask="999.999.999-99"
                maskChar={null}
                onChange={(e) => { 
                  setButtonAvailable(false) 
                  setCpf(e.target.value)
                }}
                required
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
              <Label>Data de nascimento</Label>

              <Input 
                type="date" 
                name="data_nasc"
                value={date}
                onChange={(e) => { 
                  setButtonAvailable(false) 
                  setDate(e.target.value)
                }}
                required
              />
            </InputGroup>
          </Grouping>

          <InputGroup
            style={ operation === 'EDIT' ? { display: 'none' } : { display: '' } }
          >
              <Label>Senha do cliente</Label>

              <Input 
                type="password" 
                name="password"
                maxLength={50}
                onChange={() => { setButtonAvailable(false) }}
                required={operation === 'EDIT' ? false : true}
              />
            </InputGroup>

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
 