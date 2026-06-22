import { useState, useEffect, useCallback } from 'react';

export function useFetch(fetchFunction, dependencies = []) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefresh] = useState(0);

  const refresh = useCallback(() => setRefresh(k => k + 1), []);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    fetchFunction()
      .then(hasil => { 
        if (isMounted) { 
          setData(hasil); 
          setLoading(false); 
        } 
      })
      .catch(err => { 
        if (isMounted) { 
          setError(err.message || 'Terjadi kesalahan'); 
          setLoading(false); 
        } 
      });

    return () => { isMounted = false; };
  }, [refreshKey, ...dependencies]);

  return { data, isLoading, error, refresh };
}
