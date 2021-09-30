import { useHistory } from 'react-router-dom';

import Toast from '../../utils/toastify';

import api from './api';

export const useAddress = () => {
  const history = useHistory();

  async function updateAddress(data) {
    try {
      data.logradouro = data.logradouro || null
      data.numero = data.numero || null
      data.cep = data.cep || null
      data.cidade = data.cidade || null
      data.bairro = data.bairro || null
      data.uf = data.uf || null
      data.latitude = data.latitude || null
      data.longitude = data.longitude || null

      const res = await api.put('/address', data);

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

  return { updateAddress }
}

export default useAddress;
