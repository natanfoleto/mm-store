import { useHistory } from 'react-router-dom';

import Toast from '../utils/toastify';

import api from '../services/api';

export const usePermission = () => {
  const history = useHistory();

  async function createPermission(data) {   
    try {
      const res = await api.post('/permission', {
        nome: data.nome,
        tipo: data.tipo,
        descricao: data.descricao,
        contexto: data.contexto
      });

      if (res.status === 206) {
        Toast('warn', res.data.error.details[0].message);

        return false;
      }

      const { result, message } = res.data;
      
      Toast(result, message);

      if (result === 'success')
        history.goBack()
     
    } catch (err) {
      Toast('error', err.toString());

      return false;
    }
  }

  async function updatePermission(data) {
    try {
      const res = await api.put('/permission', data);

      if (res.status === 206) {
        Toast('warn', res.data.error.details[0].message);

        return false;
      }

      const { result, message } = res.data;
      
      Toast(result, message);

      if (result === 'success')
        history.goBack()
     
    } catch (err) {
      Toast('error', err.toString());

      return false;
    }
  }

  async function deletePermission(data) {
    try {
      const res = await api.delete('/permission', data);

      if (res.status === 206) {
        Toast('warn', res.data.error.details[0].message);

        return false;
      }

      const { result, message } = res.data;
      
      Toast(result, message);
      
      if (result === 'success') 
        history.go(0)

    } catch (err) {
      Toast('error', err.toString());


      return false;
    }
  }

  return { createPermission, updatePermission, deletePermission }
}

export default usePermission;
