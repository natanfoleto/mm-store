import { useHistory } from 'react-router-dom';

import Toast from '../../utils/toastify';

import api from './api';

export const usePermission = () => {
  const history = useHistory();

  async function createPermission(data) {   
    try {
      const res = await api.post('/permission', data);

      const { result, message } = res.data;
      
      Toast(result, message);

      if (result === 'success')
        history.goBack()
     
    } catch (err) {
        if (!err.response) {
          Toast('error', 'Network Error');
        } else {
          const { data, status } = err.response

          if (status === 403 || status === 422) {
            Toast(data.result, data.message);
    
            return;
          }
          
          Toast('error', err.toString());
    
          return;
        }
      }
  }

  async function updatePermission(data) {
    try {
      const res = await api.put('/permission', data);

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

  async function deletePermission(data) {
    try {
      const res = await api.delete('/permission', data);

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

  return { createPermission, updatePermission, deletePermission }
}

export default usePermission;
