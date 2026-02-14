import { useState, useEffect } from 'react';

export function useRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = process.env.REACT_APP_API_URL || '';
    fetch(`${apiBase}/api/routes`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setRoutes(Array.isArray(data) ? data : []))
      .catch(() => setRoutes([]))
      .finally(() => setLoading(false));
  }, []);

  return { routes, loading };
}
