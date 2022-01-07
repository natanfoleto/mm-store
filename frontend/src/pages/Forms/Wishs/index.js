import { useEffect, useState, useCallback} from 'react';

import api from '../../../services/api/api';
import Toast from '../../../utils/toastify';

import { useHistory } from 'react-router-dom';

import Layout from '../../Layouts/default';

import wishService from '../../../services/api/wish'

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Select from '../../../components/Select';

import { Container, Footer, Title, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormWish() {
  const history = useHistory();

  const { createWish, updateWish } = wishService();

  const [wish, setWish] = useState();
  const [currentClient, setCurrentClient] = useState();
  const [clients, setClients] = useState([]);
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    async function searchAllClients() {
      try {
        const { data } = await api.post('/clients/search/1/1000', { key: '' });
  
        let newData = [];
    
        data.data.forEach((item) => {
          const element = { id: item.id_cliente, title: item.nome };
  
          newData.push(element)
        });
  
        setClients(newData);
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

    searchAllClients();
    if (history.location.pathname === '/pedidos/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');

      const state = history.location.state;

      if (!state) history.goBack()

      setWish(state);
    }
  }, [history])

  async function handleSubmit(data) {
    if (data.url_foto === '') {
      data.url_foto = null
    }

    if (operation === 'ADD') {
      delete data.id_pedido;

      await createWish(data)
    } else {
      delete data.id_cliente

      await updateWish(data);
    }
  }

  function handleCancel() {
    history.goBack()
  }

  const handleSelect = useCallback((e) => {
    setCurrentClient(e.target.value);
    setButtonAvailable(false);
  }, [])

  return (
    <Layout 
      background= "#F1F1F1"
      title={operation === 'ADD' ? 'Novo pedido' : `Editando: ${wish && wish.descricao}`}
    >
      <Container>
        <Form initialData={wish} onSubmit={handleSubmit} autoComplete="off">
          <Title>
            <h1> { operation === 'ADD' ? 'Novo pedido' : 'Editar pedido' }</h1>
          </Title>
          
          <Input 
            type="text" 
            name="id_pedido"
            hidden={true}
          />

          <InputGroup
            style={ operation === 'EDIT' ? { display: 'none' } : { display: '' } }
          >
            <Label>Escolha o cliente</Label>

            <Select 
              name="id_cliente" 
              value={currentClient}
              onChange={handleSelect}
              options={clients} 
              required={operation === 'EDIT' ? false : true}
            />
          </InputGroup>
          
          <InputGroup>
            <Label>Descrição</Label>

            <Input 
              type="text" 
              name="descricao"
              maxLength={100}
              onChange={() => { setButtonAvailable(false) }}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>URL da foto (opicional)</Label>

            <Input 
              type="text" 
              name="url_foto"
              maxLength={100}
              onChange={() => { setButtonAvailable(false) }}
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
 