import { useHistory } from 'react-router-dom';
import { Select } from '@rocketseat/unform';
import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import Toast from '../../utils/toastify';

import Layout from '../_layouts/default';

import ComponentCard from '../../components/DataCard/index';
import Card from './components/Card';

import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';
import { BiLoader } from 'react-icons/bi';

import { Body } from '../../styles/crud';

export default function Permissions() {
  const history = useHistory();

  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState('');

  const rows = [
    { id: '10', title: '10 linhas' },
    { id: '20', title: '20 linhas' },
    { id: '30', title: '30 linhas' },
    { id: '50', title: '50 linhas' },
    { id: '100', title: '100 linhas' },
    { id: '0', title: 'Todas linhas' },
  ]

  useEffect(() => {
    async function searchPermissions() {
      try {
        const { data, status } = await api.post(`/permission/search/${currentPage}/${limit}`, {
          key: search
        });

        if (status === 206) {
          Toast('warn', data.error.details[0].message);
  
          return false;
        }

        if (status === 200) {
          setData(data.data);
          setTotalRecords(data.total);
          setTotalPages(
            limit === 0 
            ? Math.ceil(data.total / limit)
            : Math.ceil(data.total / data.total)
          );
        } 
      } catch (err) {
        Toast('error', err.toString());
  
        return false;
      }
    }

    searchPermissions();
  }, [limit, currentPage, search])

  function handleCreate() {
    history.push('/permissoes/add');
  }

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])

  return (
    <Layout>      
      <Body>
        <Body.Title>
          <h1> Permissões </h1>
          <p> Configuração que permite os usuários realizar feitos </p>
        </Body.Title>

        {/* Cabeçalho do body */}
        <Body.Header>
          <Body.Filter>
            <Body.Input 
              placeholder="Pesquise por permissão"
              value={search}
              maxLength={50}
              onChange={e => setSearch(e.target.value)}
            />

            <Select 
              name="rows"
              options={rows}
              onChange={handleLimit}
              placeholder={`${limit} rows`}
            />

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
            <br />
            <strong>{totalRecords}</strong> registro(s) encontrado(s)
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
 