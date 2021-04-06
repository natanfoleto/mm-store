import { useHistory } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';

import Layout from '../_layouts/default';
import useProfile from '../../hooks/useProfile';

import ComponentItemCard from '../../components/DataCard/index';

import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';
import { BiLoader } from 'react-icons/bi';

import { Body } from './styles';

export default function Perfis() {
  const history = useHistory();

  const { searchProfiles } = useProfile();

  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState('');

  useEffect(() => {
    loadData(search);
  }, [limit, currentPage, search])

  async function loadData() {    
    const { data, total } = await searchProfiles(search, currentPage, limit);
    
    if (data) {
      setData(data);
      setTotalPages(Math.ceil(total / limit));
    }    
  }

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
              onChange={e => setSearch(e.target.value)}
            />
             
            <Body.Select onChange={handleLimit}>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="30">30 rows</option>
              <option value="50">50 rows</option>
              <option value="100">100 rows</option>
            </Body.Select>
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
                <ComponentItemCard 
                  key={index} 
                  item={item} 
                  type="perfis" 
                />
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
 