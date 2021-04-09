import { useEffect, useState } from 'react'; 
import { Form, Input } from '@rocketseat/unform';

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/form';

import useProfile from '../../../hooks/useProfile';

import { Body, FormContainer, IGroup, BGroup } from './styles';

export default function FormPerfis() {
  const history = useHistory();

  const { createProfile, updateProfile } = useProfile();

  const [profile, setProfile] = useState();
  const [pathname, setPathname] = useState();

  useEffect(() => {
    setProfile(history.location.state);
    setPathname(history.location.pathname);
  }, [history])
  
  async function handleSubmit(data) {
    if (pathname === '/perfis/add')
      await createProfile(data)

    if (pathname === '/perfis/edit')
      await updateProfile(data);
  }

  function handleCancel() {
    history.goBack()
  }

  return (
    <Layout>  
      <Body>
        <FormContainer>
          <Form initialData={profile} onSubmit={handleSubmit} autoComplete="off">
            <FormContainer.Title>
              <h1>Novo perfil!</h1>
              <p>Crie um novo perfil, para delegar permissões aos usuários!</p>
            </FormContainer.Title>

            <Input 
              type="text" 
              name="id_perfil"
              hidden={true}
            />

            <IGroup>
              <IGroup.Label>Nome</IGroup.Label>

              <Input 
                type="text" 
                name="nome"
                required
              />
            </IGroup>

            <BGroup>
              <BGroup.Button 
                type="submit" 
                color="#003464"
              >
                { pathname === '/perfis/add' ? 'Criar' : 'Atualizar'}
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
 