import { useEffect, useState, useCallback } from 'react'; 

import api from '../../../services/api/api';
import Toast from '../../../utils/toastify';

import { useHistory } from 'react-router-dom';

import Layout from '../../Layouts/default';

import userService from '../../../services/api/user';

import Form from '../../../components/Form';
import Input from '../../../components/Input';
import Button from '../../../components/Button'
import Select from '../../../components/Select';

import { Container, Title, InputGroup, ButtonGroup, Label } from '../styles';

export default function FormUser() {
  const history = useHistory();

  const { createUser, updateUser } = userService();

  const [user, setUser] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    async function searchAllProfiles() {
      try {
        const { data } = await api.post('/profiles/search/1/0');
  
        let newData = [];
    
        data.data.forEach((item) => {
          const element = { id: item.id_perfil, title: item.nome };
  
          newData.push(element)
        });
  
        setProfiles(newData);
      } catch (err) {
        const { data, status } = err.response

        if (status === 403 || status === 422) {
          Toast(data.result, data.message);
  
          return;
        }
        
        Toast('error', err.toString());
  
        return;
      }
    }

    searchAllProfiles();

    setUser(history.location.state);

    if (history.location.pathname === '/usuarios/add') {
      setOperation('ADD');
    }
    else {
      setOperation('EDIT');
      setCurrentProfile(history.location.state.id_perfil);
    }
  }, [history])

  async function handleSubmit(data) {
    if (operation === 'ADD') {
      delete data.id_usuario;

      await createUser(data)
    } else {
      delete data.password;

      await updateUser(data);
    }
  }

  function handleCancel() {
    history.goBack()
  }

  const handleSelect = useCallback((e) => {
    setCurrentProfile(e.target.value);
    setButtonAvailable(false);
  }, [])

  return (
    <Layout title={operation === 'ADD' ? 'Novo usuário' : `Editando: ${user && user.nome}`}>  
      <Container>
        <Form initialData={user} onSubmit={handleSubmit} autoComplete="off">
          <Title>
            <h1> { operation === 'ADD' ? 'Novo usuário' : 'Editar usuário' }</h1>
          </Title>
          
          <Input 
            type="text" 
            name="id_usuario"
            hidden={true}
          />

          <InputGroup>
            <Label>Escolha o perfil</Label>

            <Select 
              name="id_perfil" 
              value={currentProfile}
              onChange={handleSelect}
              options={profiles} 
              required
            />
          </InputGroup>
          
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

          <InputGroup>
            <Label>Login</Label>

            <Input 
              type="text" 
              name="login"
              maxLength={50}
              onChange={() => { setButtonAvailable(false) }}
              required
            />
          </InputGroup>

          <InputGroup
            style={ operation === 'EDIT' ? { display: 'none' } : { display: '' } }
          >
            <Label>Sua senha secreta</Label>
            
            <Input 
              type="password" 
              name="password"
              maxLength={32}
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
 