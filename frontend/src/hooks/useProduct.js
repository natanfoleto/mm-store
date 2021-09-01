import { useHistory } from 'react-router-dom';

import Toast from '../utils/toastify';
import { replaceForNumber } from '../utils/replaceValue';

import api from '../services/api';

export const useProduct = () => {
  const history = useHistory();

  async function createProduct(data) {   
    try {
      const convertedData = {
        id_categoria: data.id_categoria,
        id_fornecedor: data.id_fornecedor === 'Nenhum' ? null : data.id_fornecedor,
        nome: data.nome,
        preco_custo: replaceForNumber(data.preco_custo),
        preco_venda: replaceForNumber(data.preco_venda),
        tamanho: data.tamanho,
        estoque: data.estoque,
      }
  
      const res = await api.post('/products', convertedData)

      const { result, message } = res.data;
      
      Toast(result, message);

      if (result === 'success')
        history.goBack()
     
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

  async function updateProduct(data) {
    try {
      const convertedData = {
        id_produto: data.id_produto,
        id_categoria: data.id_categoria,
        id_fornecedor: data.id_fornecedor === 'Nenhum' ? null : data.id_fornecedor,
        nome: data.nome,
        preco_custo: replaceForNumber(data.preco_custo),
        preco_venda: replaceForNumber(data.preco_venda),
        tamanho: data.tamanho,
        estoque: data.estoque,
      }

      const res = await api.put('/products', convertedData);

      const { result, message } = res.data;
      
      Toast(result, message);

      if (result === 'success')
        history.goBack()
     
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

  async function deleteProduct(data) {
    try {
      const res = await api.delete('/products', data);

      const { result, message } = res.data;
      
      Toast(result, message);
      
      if (result === 'success') 
        history.go(0)

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

  return { createProduct, updateProduct, deleteProduct }
}

export default useProduct;
