import { useHistory } from 'react-router-dom';
import { Select } from '@rocketseat/unform';
import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import { rows } from '../../services/dataLocal'
import Toast from '../../utils/toastify';

import Layout from '../_layouts/default';

import ComponentCard from '../../components/DataCard/index';
import Card from './components/Card';

import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';
import { BiLoader } from 'react-icons/bi';

import { Body } from '../../styles/crud';

export default function Profiles() {
  const history = useHistory();

  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState('');

  useEffect(() => {
    async function searchProfile() {
      try {
        const { data } = await api.post(`/profiles/search/${currentPage}/${limit}`, { 
          key: search 
        });

        setData(data.data);
        setTotalRecords(data.total);

        setTotalPages(
          limit === 0 
          ? Math.ceil(data.total / limit)
          : (data.total / data.total)
        );
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

    searchProfile();
  }, [limit, currentPage, search])

  function handleCreate() {
    history.push('/perfis/add');
  }

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])

  return (
    <Layout>      
      <Body>
        <Body.Title>
          <h1> Perfis </h1>
          <p> Cargos destinados aos usuários </p>
        </Body.Title>

        {/* Cabeçalho do body */}
        <Body.Header>
          <Body.Filter>
            <Body.Input 
              placeholder="Pesquise pelo nome" 
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
            Page <strong>{currentPage}</strong> of <strong>{totalPages ? totalPages : 1}</strong>
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
 