import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Toast from '../utils/toastify';

import api from '../services/api';

export const useProfile = () => {
  const history = useHistory();
  
  const [loading, setLoading] = useState(false);

  async function searchProfiles(nome, page, limit) {
    setLoading(true);

    try {
      const { data } = await api.post(`/perfis/search/${page}/${limit}`, { nome: nome });

      setLoading(false);

      return { data, loading }
    } catch (err) {
      Toast('error', err.toString());

      setLoading(false);

      return;
    }
  }

  async function createProfile(data) {
    setLoading(true);

    try {
      const res = await api.post('/perfis', data);

      if (res.status === 206) {
        Toast('default', res.data.error.details[0].message);

        return;
      }

      const { result, message } = res.data;
      
      Toast(result, message);

      if (result === 'success')
        history.goBack()
     
      setLoading(false);
    } catch (err) {
      Toast('error', err.toString());

      setLoading(false);

      return;
    }
  }

  async function updateProfile(data) {
    setLoading(true);

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
     
      setLoading(false);
    } catch (err) {
      Toast('error', err.toString());

      setLoading(false);

      return;
    }
  }

  async function deleteProfile(data) {
    setLoading(true);
  
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

      setLoading(false);
    } catch (err) {
      Toast('error', err.toString());

      setLoading(false);

      return;
    }
  }

  return { loading, searchProfiles, createProfile, updateProfile, deleteProfile }
}

export default useProfile;
