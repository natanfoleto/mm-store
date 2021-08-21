import Toast from '../utils/toastify';

import api from '../services/api';

export const usePermissions = () => {
  async function createPermissions(data) {   
    try {
      const res = await api.post('/permissions', {
        id_perfil: data.id_perfil,
        id_permissao: data.id_permissao
      });

      const { result, message } = res.data;
      
      Toast(result, message);
     
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

  async function deletePermissions(data) {
    try {
      const res = await api.delete('/permissions', data);

      const { result, message } = res.data;
      
      Toast(result, message);

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

  return { createPermissions, deletePermissions }
}

export default usePermissions;
