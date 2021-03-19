import api from '../services/api';
import { removeItem } from '../utils/LocalStorage';

async function logIn (login, password) {
  try {
    const res = await api.post('/sessions', { login, password });
    
    const { result } = res.data;

    if (res.status === 206) {
      const message = res.data.error.details[0].message; 

      return { result: 'error', message }
    }

    if (res.status === 200 ) {
      if (result === 'error') {
        const { result, message } = res.data;
    
        return { result, message };
      }
  
      if (result === 'success') {
        const { usuario, token } = res.data;
    
        api.defaults.headers.Authorization = `Bearer ${token}`;
        
        return { result, usuario, token }
      }
    }
  } catch (err) {
    console.log('Error: ', err);
    return err;
  }
}

async function logOut () {
  removeItem('auth');
}

export { logIn, logOut };
