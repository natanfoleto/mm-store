import { useHistory } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api/api';
import Toast from '../../utils/toastify';

import Layout from '../Layouts/default';

import HeaderPage from '../../components/HeaderPage'
import Table from '../../components/Table/Profiles'
import Navigation from '../../components/Navigation'

export default function Profiles() {
  const history = useHistory();

  const [key, setKey] = useState('');
  const [data, setData] = useState();
  const [limit, setLimit] = useState(15);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewPermission, setViewPermission] = useState(false);


  useEffect(() => {
    async function searchProfile() {
      try {
        const { data } = await api.post(`/profiles/search/${currentPage}/${limit}`, { 
          key: key
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
  }, [limit, currentPage, key])

  function handleCreate() {
    history.push('/perfis/add');
  }

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])

  return (
    <Layout title="Gestão de Perfis">      
      <HeaderPage
        handleCreate={handleCreate}
        buttonText="Novo perfil"
      >
        Gestão de Perfis 
      </HeaderPage>

      <Table 
        data={data}
        onSearchChange={setKey}
      />
      
      <Navigation 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalRecords={totalRecords}
        viewPermission={viewPermission}
        limit={limit}
        handleLimit={handleLimit}
      />
    </Layout>
  );
}
 