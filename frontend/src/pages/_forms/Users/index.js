import { useEffect, useState, useCallback } from 'react'; 
import { Form, Input, Select } from '@rocketseat/unform';
import api from '../../../services/api';
import Toast from '../../../utils/toastify';

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/form';

import useUser from '../../../hooks/useUser';

import { Body, Container, IGroup, BGroup } from './styles';

export default function FormUsuarios() {
  const history = useHistory();

  const { createUser, updateUser } = useUser();

  const [user, setUser] = useState();
  const [currentProfile, setCurrentProfile] = useState();
  const [buttonAvailable, setButtonAvailable] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [operation, setOperation] = useState();
  
  useEffect(() => {
    async function searchAllProfiles() {
      try {
        const { data } = await api.get('/perfis/search/all');
  
        let newData = [];
    
        data.forEach((item) => {
          const element = { id: item.id_perfil, title: item.nome };
  
          newData.push(element)
        });
  
        setProfiles(newData);
      } catch (err) {
        Toast('error', err.toString());
  
        return false;
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
    <Layout>  
      <Body>
        <Container>
          <Container.Title>
            <h1> { operation === 'ADD' ? 'Novo usuário!' : 'Editar usuário!' }</h1>
            <p>Use os usuários, para criar acessos no sistema!</p>
          </Container.Title>

          <Form initialData={user} onSubmit={handleSubmit} autoComplete="off">
            <Input 
              type="text" 
              name="id_usuario"
              hidden={true}
            />

            <IGroup>
              <IGroup.Label>Escolha o perfil</IGroup.Label>

              <Select 
                name="id_perfil" 
                value={currentProfile}
                onChange={handleSelect}
                options={profiles} 
                required
              />
            </IGroup>
            
            <IGroup>
              <IGroup.Label>Nome</IGroup.Label>

              <Input 
                type="text" 
                name="nome"
                maxLength={100}
                onChange={() => { setButtonAvailable(false) }}
                required
              />
            </IGroup>

            <IGroup>
              <IGroup.Label>Login</IGroup.Label>

              <Input 
                type="text" 
                name="login"
                maxLength={50}
                onChange={() => { setButtonAvailable(false) }}
                required
              />
            </IGroup>

            <IGroup
              style={ operation === 'EDIT' ? { display: 'none' } : { display: '' } }
            >
              <IGroup.Label>Sua senha secreta</IGroup.Label>
              
              <Input 
                type="password" 
                name="password"
                maxLength={32}
                onChange={() => { setButtonAvailable(false) }}
                required={operation === 'EDIT' ? false : true}
              />
            </IGroup>

            <BGroup>
              <BGroup.Button 
                type="submit" 
                color="#003464"
                disabled={buttonAvailable}
              >
                Salvar
              </BGroup.Button>

              <BGroup.Button 
                type="button"
                color="#e84545"
                onClick={handleCancel}
              >
                Cancelar
              </BGroup.Button>
            </BGroup>
          </Form>
        </Container>
      </Body>
    </Layout>
  );
}
 