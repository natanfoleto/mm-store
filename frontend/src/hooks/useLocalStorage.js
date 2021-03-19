import { useState, useEffect } from 'react';

function useLocalStorage(key, initialState) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem(key, state)
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;