import { useState } from 'react';

import api from '../services/api';

export const useProfile = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function searchProfiles(nome, page, limit) {
    setLoading(true);

    try {
      const { data } = await api.post(`/perfis/search/${page}/${limit}`, { nome: nome });

      setError(null);
      setLoading(false);

      return { data, error, loading }
    } catch (err) {
      setError(err.toString());
      setLoading(false);

      return;
    }
  }

  return { loading, error, searchProfiles }
}

export default useProfile;
