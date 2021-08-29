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

import { Body } from '../../styles/crud';

export default function Users() {
  const history = useHistory();

  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewPermission, setViewPermission] = useState(false);

  const [search, setSearch] = useState('');

  useEffect(() => {
    async function searchUser() {
      try {
        const { data } = await api.post(`/users/search/${currentPage}/${limit}`, { 
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
        <Title 
          title="Usuários"
          subTitle="Somente os usuários tem acesso ao sistema"
        />

        <Search 
          placeholder="Pesquise por um usuário"
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
      </Body>
    </Layout>
  );
}
 