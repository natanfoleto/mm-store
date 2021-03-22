import { useState } from 'react';

import api from '../services/api';

export const useProfile = () => {
  const [profiles, setProfiles] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function searchProfiles() {
    setLoading(true);

    let res;

    try {
      res = await api.get('/perfis');
    } catch (err) {
      setError(err.toString());
      setLoading(false);

      return;
    }
    
    setProfiles(res.data)
    setError(null);
    setLoading(false);
  }

  return { profiles, loading, error, searchProfiles }
}

export default useProfile;
