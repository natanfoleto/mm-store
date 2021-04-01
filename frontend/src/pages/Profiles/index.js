import { useEffect, useState, useCallback } from 'react';

import Layout from '../_layouts/default';
import useProfile from '../../hooks/useProfile';

import ComponentItemCard from '../../components/ItemCard/index';

import { CgPlayTrackPrev, CgPlayTrackNext } from 'react-icons/cg';

import { Body, Data, Navigation } from './styles';

export default function Perfils() {
  const { searchProfiles } = useProfile();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState([]);
  const [totalPages, setTotalPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadData();
  }, [pages])

  async function loadData() {
    const { data } = await searchProfiles(currentPage, limit);

    setData(data.data)
    setTotal(data.total);

    const totalPages = Math.ceil(total / limit);

    const arrayPages = [];

    for (let i = 1; i <= totalPages; i++) {
      arrayPages.push(i);
    }

    setPages(arrayPages);
    setTotalPages(totalPages);
  }

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])


  return (
    <Layout>      
      <Body>
        <Body.Title>Perfis</Body.Title>

        {/* Cabeçalho do body */}
        <Body.Header>
          <Body.Filter>
            <Body.Input placeholder="Pesquise pelo nome"/>

            <Body.Select onChange={handleLimit}>
              <option value="10">10 rows</option>
              <option value="20">20 rows</option>
              <option value="30">30 rows</option>
              <option value="50">50 rows</option>
              <option value="100">100 rows</option>
            </Body.Select>
          </Body.Filter>

          <Body.Button>Criar</Body.Button>
        </Body.Header>

        {/* Dados do banco de dados renderizados */}
        <Data>
          { 
            data.map(item => (
              <ComponentItemCard item={item} type="perfis" />
            ))
          }
        </Data>
        
        {/* Navegação dos dados renderizados */}
        <Navigation>
          <Navigation.Button
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage(currentPage - 1)
            }} 
          > 
            <CgPlayTrackPrev size={22} /> 
          </Navigation.Button>
            
          <Navigation.Span>
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </Navigation.Span>
 
          <Navigation.Button
            disabled={currentPage >= totalPages}
            onClick={() => {
              setCurrentPage(currentPage + 1)
            }} 
          > 
            <CgPlayTrackNext size={22} /> 
          </Navigation.Button>
             
        </Navigation>

      </Body>
    </Layout>
  );
}
 