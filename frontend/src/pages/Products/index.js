import { useHistory } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import api from '../../services/api/api';
import Toast from '../../utils/toastify';
import { replaceForDecimal } from '../../utils/replaceValue';

import Layout from '../Layouts/default';

import HeaderPage from '../../components/HeaderPage'
import Table from '../../components/Table/Products'
import Navigation from '../../components/Navigation'

export default function Products() {
  const history = useHistory();

  const [data, setData] = useState();
  const [limit, setLimit] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewPermission, setViewPermission] = useState(false);


  useEffect(() => {
    async function searchUser() {
      try {
        const { data } = await api.post(`/products/search/${currentPage}/${limit}`, { 
          key: '' 
        });

        data.data && data.data.forEach((item, index) => {
          data.data[index].preco_custo = replaceForDecimal((item.preco_custo).toString())
          data.data[index].preco_venda = replaceForDecimal((item.preco_venda).toString())
        })

        setData(data.data);
        setTotalRecords(data.total);
        setTotalPages(
          Number(limit) === 0 
          ? Math.ceil(data.total / data.total)
          : Math.ceil(data.total / limit)
        );

      } catch (err) {
        console.log(err)
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
  }, [limit, currentPage])

  function handleCreate() {
    history.push('/produtos/add');
  }

  const handleLimit = useCallback((e) => {
    setLimit(e.target.value);
    setCurrentPage(1);
  }, [])

  return (
    <Layout title="Gestão de Produtos">
      <HeaderPage
        handleCreate={handleCreate}
        buttonText="Novo produto"
      >
        Gestão de Produtos 
      </HeaderPage>

      <Table 
        data={data}
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
 