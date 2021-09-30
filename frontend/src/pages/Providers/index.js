import { useHistory } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api/api';
import Toast from '../../utils/toastify';

import Layout from '../Layouts/default';

import HeaderPage from '../../components/HeaderPage'
import Table from '../../components/Table/Providers'
import Navigation from '../../components/Navigation'

import { Container } from '../styles'

export default function Products() {
  const history = useHistory();

  const [key, setKey] = useState('');
  const [data, setData] = useState();
  const [limit, setLimit] = useState(15);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewPermission, setViewPermission] = useState(false);


  useEffect(() => {
    async function searchUser() {
      try {
        const { data } = await api.post(`/providers/search/${currentPage}/${limit}`, { 
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
        if (!err.response) {
          Toast('error', 'Network Error');
        } else {
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
    }

    searchUser();
  }, [limit, currentPage, key])

  function onSearchChange(value) {
    setKey(value)
    setCurrentPage(1)
  }

  function handleCreate() {
    history.push('/fornecedores/add');
  }

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])

  return (
    <Layout title="Gestão de Fornecedores">
      <Container>
        <HeaderPage
          handleCreate={handleCreate}
          buttonText="Novo fornecedor"
        >
          Gestão de Fornecedores 
        </HeaderPage>

        <Table 
          data={data}
          onSearchChange={onSearchChange}
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
      </Container>
    </Layout>
  );
}
 