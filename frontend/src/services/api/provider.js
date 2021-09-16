import { useHistory } from 'react-router-dom';

import Toast from '../../utils/toastify';

import api from './api';

export const useProvider = () => {
  const history = useHistory();

  async function createProvider(data) {   
    try {
      const res = await api.post('/providers', data)

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

  async function updateProvider(data) {
    try {
      const res = await api.put('/providers', data);

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

  async function deleteProvider(data) {
    try {
      const res = await api.delete('/providers', data);

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

  return { createProvider, updateProvider, deleteProvider }
}

export default useProvider;
