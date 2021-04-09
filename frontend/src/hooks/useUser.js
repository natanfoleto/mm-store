import { useHistory } from 'react-router-dom';

import Toast from '../utils/toastify';

import api from '../services/api';

export const useUser = () => {
  const history = useHistory();
  
  async function searchUser(key, page, limit) {
    try {
      const res = await api.post(`/usuarios/search/${page}/${limit}`, { 
        key: key 
      });

      if (res.status === 206) {
        Toast('warn', res.data.error.details[0].message);

        return false;
      }

      return res.data;
    } catch (err) {
      Toast('error', err.toString());

      return false;
    }
  }

  async function createUser(data) {   
    try {
      const res = await api.post('/usuarios', {
        id_perfil: data.id_perfil,
        nome: data.nome,
        login: data.login,
        password: data.password
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

  async function updateUser(data) {
    try {
      const res = await api.put('/usuarios', data);

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

  async function deleteUser(data) {
    try {
      const res = await api.delete('/usuarios', data);

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

  return { searchUser, createUser, updateUser, deleteUser }
}

export default useUser;
