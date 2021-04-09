import { useEffect, useState } from 'react'; 
import { Form, Input, Select } from '@rocketseat/unform';

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/form';

import useUser from '../../../hooks/useUser';
import useProfile from '../../../hooks/useProfile';

import { Body, FormContainer, IGroup, BGroup } from './styles';

export default function FormUsuarios() {
  const history = useHistory();

  const { createUser, updateUser } = useUser();
  const { searchProfile } = useProfile();

  const [user, setUser] = useState();
  const [profiles, setProfiles] = useState();
  const [pathname, setPathname] = useState();

  useEffect(() => {
    loadProfiles()
    setUser(history.location.state);
    setPathname(history.location.pathname);
  }, [history])

  async function loadProfiles() {    
    const { data } = await searchProfile('', 1, 100);
    
    if (data) {
      let options = [];

      data.map((item) => {
        const element = { id: item.id_perfil, title: item.nome };

        options.push(element)
      });

      setProfiles(options);
    }    
  }
  
  async function handleSubmit(data) {
    if (pathname === '/usuarios/add')
      await createUser(data)

    if (pathname === '/usuarios/edit')
      await updateUser(data);
  }

  function handleCancel() {
    history.goBack()
  }

  return (
    <Layout>  
      <Body>
        <FormContainer>
          <FormContainer.Title>
            <h1>Novo usuário!</h1>
            <p>Crie um novo usuário, para separar os tipos de acessos no sistema!</p>
          </FormContainer.Title>

          <Form initialData={user} onSubmit={handleSubmit} autoComplete="off">
            <Input 
              type="text" 
              name="id_usuario"
              hidden={true}
            />

            <IGroup>
              <IGroup.Label>Escolha o perfil</IGroup.Label>

              <Select 
                name="perfis" 
                options={profiles ? profiles : []} 
                required
              />
            </IGroup>
            
            <IGroup>
              <IGroup.Label>Nome</IGroup.Label>

              <Input 
                type="text" 
                name="nome"
                required
              />
            </IGroup>

            <IGroup>
              <IGroup.Label>Login</IGroup.Label>

              <Input 
                type="text" 
                name="login"
                required
              />
            </IGroup>

            <IGroup>
              <IGroup.Label>Sua senha secreta</IGroup.Label>
              
              <Input 
                type="password" 
                name="password"
                required
              />
            </IGroup>

            <BGroup>
              <BGroup.Button 
                type="submit" 
                color="#003464"
              >
                { pathname === '/usuarios/add' ? 'Criar' : 'Atualizar'}
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
        </FormContainer>
      </Body>
    </Layout>
  );
}
 