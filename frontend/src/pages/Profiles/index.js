import Layout from '../_layouts/default';
import useProfile from '../../hooks/useProfile';

import ComponentProfile from './components/Profile';

import { Body } from './styles';

export default function Perfils() {
  const { searchProfiles } = useProfile();

  const data = [
    { id_perfil: 1, nome: 'Nome Foleto', created_at: '10/07/1999 00:00:00', updated_at: '10/07/1999 00:00:00' },
    { id_perfil: 2, nome: 'Matheus Finoto', created_at: '10/07/1999 00:00:00', updated_at: '10/07/1999 00:00:00' },
    { id_perfil: 3, nome: 'Pedro Animes', created_at: '10/07/1999 00:00:00', updated_at: '10/07/1999 00:00:00' },
    { id_perfil: 4, nome: 'Naldão do Psy', created_at: '10/07/1999 00:00:00', updated_at: '10/07/1999 00:00:00' },
    { id_perfil: 5, nome: 'Lucas Lenhador', created_at: '10/07/1999 00:00:00', updated_at: '10/07/1999 00:00:00' },
    { id_perfil: 6, nome: 'Vinicius Palheiros', created_at: '10/07/1999 00:00:00', updated_at: '10/07/1999 00:00:00' },
  ]

  return (
    <Layout>      
      <Body>
        <Body.Header>
          <p>Perfils</p>
          <Body.Button>Criar</Body.Button>
        </Body.Header>

        { 
          data.map(item => (
            <ComponentProfile item={item} />
          ))
        }

        {/* <Body.Table>
          <ComponentTable functionLoad={searchProfiles} headers={headers} />
        </Body.Table> */}
      </Body>
    </Layout>
  );
}
 