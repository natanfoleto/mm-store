import { useHistory } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api';
import Toast from '../../utils/toastify';

import Layout from '../_layouts/default';

import Card from './components/Card';
import Title from '../../components/Title'
import Search from '../../components/Search'
import Table from '../../components/Table'
import Navigation from '../../components/Navigation'

export default function Profiles() {
  const history = useHistory();

  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewPermission, setViewPermission] = useState(false);

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
          Number(limit) === 0 
          ? Math.ceil(data.total / data.total)
          : Math.ceil(data.total / limit)
        );
      } catch (err) {
        const { data, status } = err.response

        if (status === 403 || status === 422) {
          Toast(data.result, data.message);

          if (status === 403)
            setViewPermission(true)
  
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
    <Layout title="Gestão de Perfis">      
      <Title 
        title="Perfis"
        subTitle="Cargos destinados aos usuários"
      />

      <Search 
        placeholder="Pesquise pelo nome"
        search={search}
        setSearch={setSearch}
        viewPermission={viewPermission}
        limit={limit}
        handleLimit={handleLimit}
        handleCreate={handleCreate}
      />

      <Table 
        data={data}
        Card={Card}
      />
      
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
      />
    </Layout>
  );
}
 