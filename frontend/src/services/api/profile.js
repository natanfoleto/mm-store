import { useHistory } from 'react-router-dom';

import Toast from '../../utils/toastify';

import api from './api';

export const useProfile = () => {
  const history = useHistory();

  async function createProfile(data) {   
    try {
      const res = await api.post('/profiles', data);

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

  async function updateProfile(data) {
    try {
      const res = await api.put('/profiles', data);

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

  async function deleteProfile(data) {
    try {
      const res = await api.delete('/profiles', data);

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

  return { createProfile, updateProfile, deleteProfile }
}

export default useProfile;
