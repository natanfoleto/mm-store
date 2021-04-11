import { useHistory } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import Toast from '../../utils/toastify';

import Layout from '../_layouts/default';

import ComponentCard from '../../components/DataCard/index';
import Card from './components/Users';

import { Tooltip } from '@material-ui/core'
import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';
import { BiLoader } from 'react-icons/bi';

import { Body } from './styles';

export default function Perfis() {
  const history = useHistory();

  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState('');

  useEffect(() => {
    async function searchUser() {
      try {
        const { status, data } = await api.post(`/usuarios/search/${currentPage}/${limit}`, { 
          key: search 
        });
  
        if (status === 206) {
          Toast('warn', data.error.details[0].message);
  
          return false;
        }

        if (status === 200) {
          setData(data.data);
          setTotalPages(Math.ceil(data.total / limit));
        }  
      } catch (err) {
        Toast('error', err.toString());
  
        return false;
      }
    }

    searchUser();
  }, [limit, currentPage, search])

  function handleCreate() {
    history.push('/usuarios/add');
  }

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])

  return (
    <Layout>      
      <Body>
        <Body.Title>
          <h1> Usuários </h1>
          <p> Somente os usuários tem acesso ao sistema </p>
        </Body.Title>

        {/* Cabeçalho do body */}
        <Body.Header>
          <Body.Filter>
            <Body.Input 
              placeholder="Pesquise por um usuário" 
              value={search} 
              onChange={e => setSearch(e.target.value)}
            />
             
            <Tooltip title="Linhas por página" enterDelay={500} leaveDelay={200} placement="top">
              <Body.Select onChange={handleLimit}>
                <option value="10">10 rows</option>
                <option value="20">20 rows</option>
                <option value="30">30 rows</option>
                <option value="50">50 rows</option>
                <option value="100">100 rows</option>
              </Body.Select>
            </Tooltip>
          </Body.Filter>

          <Body.Button onClick={handleCreate}>
            Criar
          </Body.Button>
        </Body.Header>

        {/* Dados do banco renderizados */}
        <Body.Data>
          { 
            data ? 
              data.map((item, index) => (
                <ComponentCard 
                  key={index}
                >
                  <Card item={item} />
                </ComponentCard>
              ))
            :
              <Body.LoadData> 
                <BiLoader size={22} />
              </Body.LoadData>
          }
        </Body.Data>
        
        {/* Navegação dos dados renderizados */}
        <Body.Navigation>
          <Body.ButtonNavigation
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage(currentPage - 1)
            }} 
          > 
            <CgPlayTrackPrev size={22} /> 
          </Body.ButtonNavigation>
            
          <Body.SpanNavigation>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </Body.SpanNavigation>
 
          <Body.ButtonNavigation
            disabled={currentPage >= totalPages}
            onClick={() => {
              setCurrentPage(currentPage + 1)
            }} 
          > 
            <CgPlayTrackNext size={22} /> 
          </Body.ButtonNavigation>   
        </Body.Navigation>
      </Body>
    </Layout>
  );
}
 