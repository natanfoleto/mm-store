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
      const storageToken = await localStorage.getItem('@AUth:token');

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

    let res;

    try {
      res = await api.post('/sessions', { login, password });
    } catch (err) {
      Toast('error', err.toString());

      setLoggingIn(false);

      return;
    }
    
    const { result } = res.data;

    if (res.status === 206) {
      const message = res.data.error.details[0].message; 
      
      Toast('error', message);

      setLoggingIn(false);
    }

    if (res.status === 200 ) {
      if (result === 'error') {
        const { message } = res.data;
    
        Toast('info', message);

        setLoggingIn(false);
      }
  
      if (result === 'success') {
        const { usuario, token } = res.data;
    
        api.defaults.headers.Authorization = `Bearer ${token}`;
        
        setUser(usuario);
        setLoggingIn(false);

        localStorage.setItem('@Auth:user', JSON.stringify(usuario));
        localStorage.setItem('@AUth:token', token);
      }
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