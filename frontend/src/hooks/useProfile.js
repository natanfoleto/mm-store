import { useHistory } from 'react-router-dom';

import Toast from '../utils/toastify';

import api from '../services/api';

export const useProfile = () => {
  const history = useHistory();
  
  async function searchProfiles(nome, page, limit) {

    try {
      const { data } = await api.post(`/perfis/search/${page}/${limit}`, { 
        nome: nome 
      });

      return { data }
    } catch (err) {
      Toast('error', err.toString());

      return;
    }
  }

  async function createProfile(data) {   
    try {
      const res = await api.post('/perfis', {
        nome: data.nome
      });

      if (res.status === 206) {
        Toast('default', res.data.error.details[0].message);

        return;
      }

      const { result, message } = res.data;
      
      Toast(result, message);

      if (result === 'success')
        history.goBack()
     
    } catch (err) {
      Toast('error', err.toString());

      return;
    }
  }

  async function updateProfile(data) {
    try {
      const res = await api.put('/perfis', data);

      if (res.status === 206) {
        Toast('default', res.data.error.details[0].message);

        return;
      }

      const { result, message } = res.data;
      
      Toast(result, message);

      if (result === 'success')
        history.goBack()
     
    } catch (err) {
      Toast('error', err.toString());

      return;
    }
  }

  async function deleteProfile(data) {
    try {
      const res = await api.delete('/perfis', data);

      if (res.status === 206) {
        Toast('default', res.data.error.details[0].message);

        return;
      }

      const { result, message } = res.data;
      
      Toast(result, message);
      
      if (result === 'success') 
        history.go(0)

    } catch (err) {
      Toast('error', err.toString());


      return;
    }
  }

  return { searchProfiles, createProfile, updateProfile, deleteProfile }
}

export default useProfile;
