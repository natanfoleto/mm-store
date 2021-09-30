import { useEffect, useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import api from '../../../services/api/api';
import Toast from '../../../utils/toastify';
import InputMask from 'react-input-mask';

import Layout from '../../Layouts/default';

import clientService from '../../../services/api/client';
import addressService from '../../../services/api/address';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { RiMoneyDollarCircleFill } from 'react-icons/ri'
import { AiFillLike, AiFillDislike } from 'react-icons/ai'

import { CardContainer, Card } from './styles';
import { Container, Footer, Title, InputGroup, Grouping, ButtonGroup, Label } from '../styles';

export default function FormUser() {
  const history = useHistory();

  const { createClient, updateClient } = clientService();
  const { updateAddress } = addressService();

  const [client, setClient] = useState(Object);
  const [address, setAddress] = useState(Object);
  const [account, setAccount] = useState(Object);
  const [date, setDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    async function searchAddress() {
      try {
        const { data } = await api.post('/address/searchOne', { 
          id_endereco: history.location.state.id_endereco 
        });

        setAddress(data.data[0]);
      } catch (err) {
        if (!err.response) {
          Toast('error', 'Network Error');
        } else {
          const { data, status } = err.response

          if (status === 403 || status === 422) {
            Toast(data.result, data.message);
    
            return;
          }
          
          Toast('error', err.toString());
    
          return;
        }
      }
    }

    async function searchAccount() {
      try {
        const { data } = await api.post('/accounts/searchOne', { 
          id_cliente: history.location.state.id_cliente 
        });

        setAccount(data.data[0]);
      } catch (err) {
        if (!err.response) {
          Toast('error', 'Network Error');
        } else {
          const { data, status } = err.response

          if (status === 403 || status === 422) {
            Toast(data.result, data.message);
    
            return;
          }
          
          Toast('error', err.toString());
    
          return;
        }
      }
    }

    if (history.location.pathname === '/clientes/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');

      const state = history.location.state;

      if (!state) history.goBack()

      setClient(state);
      
      const date = new Date(state.data_nasc);
      date.setDate(date.getDate() + 3);
      const dateInput = date.toISOString().substr(0,10);

      setDate(dateInput);
      setCpf(state.cpf);
      setCelular(state.celular);

      searchAddress()
      searchAccount()
    }
  }, [history, client])

  async function handleSubmitClient(data) {
    if (operation === 'ADD') {
      delete data.id_cliente;

      await createClient(data)
    } else {
      delete data.password

      await updateClient(data);
    }
  }

  async function handleSubmitAddress(data) {
    await updateAddress(data);
  }

  function handleCancel() {
    history.goBack()
  }

  return (
    <Layout 
      background= "#F1F1F1"
      title={operation === 'ADD' ? 'Novo cliente' : `Editando: ${client.nome}`}
    >
      <Container>
        <Form initialData={client} onSubmit={handleSubmitClient} autoComplete="off">
          <Title>
            <h1> Dados cadastrais</h1>
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
              { operation === 'ADD' ? 'SALVAR' : 'ATUALIZAR' }
            </Button>
          </ButtonGroup>
        </Form>
        
        {
          operation === 'EDIT' &&
          <Form initialData={address} onSubmit={handleSubmitAddress} autoComplete="off">
            <Title>
              <h1> Endereço </h1>
            </Title>

            <Input 
              type="text" 
              name="id_endereco"
              hidden={true}
            />

            <Grouping>
              <InputGroup>
                <Label>Rua</Label>

                <Input 
                  type="text" 
                  name="logradouro"
                  maxLength={100}
                  onChange={() => { setButtonAvailable(false) }}
                />
              </InputGroup>

              <InputGroup>
                <Label>Numero</Label>

                <Input 
                  type="text" 
                  name="numero"
                  maxLength={100}
                  onChange={() => { setButtonAvailable(false) }}
                />
              </InputGroup>
            </Grouping>

            <Grouping>
              <InputGroup>
                <Label>CEP</Label>

                <Input 
                  type="text" 
                  name="cep"
                  maxLength={100}
                  onChange={() => { setButtonAvailable(false) }}
                />
              </InputGroup>

              <InputGroup>
                <Label>Cidade</Label>

                <Input 
                  type="text" 
                  name="cidade"
                  maxLength={100}
                  onChange={() => { setButtonAvailable(false) }}
                />
              </InputGroup>
            </Grouping>

            <Grouping>
              <InputGroup>
                <Label>Bairro</Label>

                <Input 
                  type="text" 
                  name="bairro"
                  maxLength={100}
                  onChange={() => { setButtonAvailable(false) }}
                />
              </InputGroup>

              <InputGroup>
                <Label>Estado</Label>

                <Input 
                  type="text" 
                  name="uf"
                  maxLength={100}
                  onChange={() => { setButtonAvailable(false) }}
                />
              </InputGroup>
            </Grouping>

            <Input 
              type="text" 
              name="latitude"
              hidden={true}
            />

            <Input 
              type="text" 
              name="longitude"
              hidden={true}
            />

            <ButtonGroup>
              <Button
                type="submit"
                background="#0052CC"
                color="#FFF"
                disabled={buttonAvailable}
              >
                ATUALIZAR
              </Button>
            </ButtonGroup>
          </Form>
        }

        {
          operation === 'EDIT' &&
          <Form initialData={account} onSubmit={() => { }} autoComplete="off">
            <Title>
              <h1> Conta </h1>
            </Title>

            <CardContainer>
              <Card>
                <div>
                  <h1>Saldo</h1>
                  <p>{ account.saldo }</p>
                </div>

                <RiMoneyDollarCircleFill size={60} color={'green'} />
              </Card>

              <Card>
                <div>
                  <h1>Situação</h1>
                  <p>{ account.status }</p>
                </div>

                { account.status === 'Pago' ? 
                  <AiFillLike size={60} color={'blue'} /> : 
                  <AiFillDislike size={60} color={'red'} />
                }
              </Card>
            </CardContainer>
          </Form>
        }

        {
          operation === 'EDIT' &&
          <Form initialData={client} onSubmit={() => { }} autoComplete="off">
            <Title>
              <h1> Pedidos </h1>
            </Title>

            <ButtonGroup>
              <Button
                type="submit"
                background="#0052CC"
                color="#FFF"
                disabled={buttonAvailable}
              >
                ATUALIZAR
              </Button>
            </ButtonGroup>
          </Form>
        }
        
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
 