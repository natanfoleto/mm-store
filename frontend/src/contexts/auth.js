import { createContext, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Toast from '../utils/toastify';

import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = await localStorage.getItem('@Auth:user');
      const storageToken = await localStorage.getItem('@Auth:token');

      if (storageUser && storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;

        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStorageData();
  }, [])

  async function signIn(login, password) {
    setLoggingIn(true);

    try {
      const res = await api.post('/sessions', { login, password });

      const { result } = res.data;
    
      if (result === 'error') {
        const { message } = res.data;
    
        Toast(result, message);

        setLoggingIn(false);
      }

      if (result === 'success') {
        const { usuario, token } = res.data;
    
        api.defaults.headers.Authorization = `Bearer ${token}`;
        
        setUser(usuario);
        setLoggingIn(false);

        localStorage.setItem('@Auth:user', JSON.stringify(usuario));
        localStorage.setItem('@Auth:token', token);
      }
    } catch (err) {
      const { data, status } = err.response

      setLoggingIn(false);

      if (status === 422) {
        Toast(data.result, data.message);

        return;
      }
      
      Toast('error', err.toString());

      return;
    }
  }

  function signOut() {
    localStorage.clear();

    setUser(null);

    history.push('/');
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, loading, user, loggingIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}