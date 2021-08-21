import { useHistory } from 'react-router-dom';

import Toast from '../utils/toastify';

import api from '../services/api';

export const useUser = () => {
  const history = useHistory();

  async function createUser(data) {   
    try {
      const res = await api.post('/users', {
        id_perfil: data.id_perfil,
        nome: data.nome,
        login: data.login,
        password: data.password
      });

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

  async function updateUser(data) {
    try {
      const res = await api.put('/users', data);

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

  async function deleteUser(data) {
    try {
      const res = await api.delete('/users', data);

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

  return { createUser, updateUser, deleteUser }
}

export default useUser;
