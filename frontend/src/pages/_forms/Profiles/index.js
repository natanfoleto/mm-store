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
  const [operation, setOperation] = useState();

  useEffect(() => {
    setProfile(history.location.state);

    if (history.location.pathname === '/perfis/add')
      setOperation('ADD');
    else
      setOperation('EDIT');
  }, [history])
  
  async function handleSubmit(data) {
    if (operation === 'ADD')
      await createProfile(data)

    if (operation === 'EDIT')
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
              <h1> { operation === 'ADD' ? 'Novo perfil!' : 'Editar perfil!' }</h1>
              <p>Utilize os perfis, para delegar permissões aos usuários!</p>
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
                { operation === 'ADD' ? 'Criar' : 'Atualizar'}
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
 