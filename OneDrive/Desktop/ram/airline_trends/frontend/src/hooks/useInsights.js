import { useState, useEffect } from 'react';

export function useInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_URL || '';
    fetch(`${apiBase}/api/insights`)
      .then(res => res.json())
      .then(data => {
        setInsights(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { insights, loading, error };
}
