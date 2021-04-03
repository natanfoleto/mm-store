import { useEffect, useState } from 'react'; 
import { Form, Input } from '@rocketseat/unform';

import { useHistory } from 'react-router-dom';

import Layout from '../../_layouts/default';
import LayoutForm from '../../_layouts/form';

import useProfile from '../../../hooks/useProfile';

import ButtonBack from '../../../components/ButtonBack';

import { Body } from './styles';

export default function FormPerfis() {
  const history = useHistory();

  const { createProfile, updateProfile } = useProfile();

  const [profile, setProfile] = useState();
  const [pathname, setPathname] = useState();

  useEffect(() => {
    setProfile(history.location.state);
    setPathname(history.location.pathname);
  }, [])
  
  async function handleSubmit(data) {
    if (pathname === '/perfis/add')
      await createProfile(data)

    if (pathname === '/perfis/edit')
      await updateProfile(data);
  }

  return (
    <Layout>  
      <LayoutForm>    
        <Body>
          <ButtonBack size={20} color={'#333'}/>

          <Form initialData={profile} onSubmit={handleSubmit} autoComplete="off">
            <Input 
              type="text" 
              name="id_perfil"
              hidden={true}
            />

            <Input 
              type="text" 
              name="nome"
              placeholder="Escolha o nome do perfil"
              required
            />

            <button type="submit">
              { pathname === '/perfis/add' ? 'Criar' : 'Atualizar'}
            </button>
          </Form>
        </Body>
      </LayoutForm>  
    </Layout>
  );
}
 