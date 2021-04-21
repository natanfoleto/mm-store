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
      const res = await api.put('/users', data);

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
      const res = await api.delete('/users', data);

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

  return { createUser, updateUser, deleteUser }
}

export default useUser;
