import Toast from '../utils/toastify';

import api from '../services/api';

export const usePermissions = () => {
  async function createPermissions(data) {   
    try {
      const res = await api.post('/permissoes', {
        id_perfil: data.id_perfil,
        id_permissao: data.id_permissao
      });

      if (res.status === 206) {
        Toast('warn', res.data.error.details[0].message);

        return false;
      }

      const { result, message } = res.data;
      
      Toast(result, message);
     
    } catch (err) {
      Toast('error', err.toString());

      return false;
    }
  }

  async function deletePermissions(data) {
    try {
      const res = await api.delete('/permissoes', data);

      if (res.status === 206) {
        Toast('warn', res.data.error.details[0].message);

        return false;
      }

      const { result, message } = res.data;
      
      Toast(result, message);

    } catch (err) {
      Toast('error', err.toString());

      return false;
    }
  }

  return { createPermissions, deletePermissions }
}

export default usePermissions;
