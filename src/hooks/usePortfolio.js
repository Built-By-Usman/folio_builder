import { useState, useEffect } from 'react';
import { dbService } from '../services/dbService';

// Basic cache to avoid repeated reads within the same session
const portfolioCache = new Map();

export const usePortfolio = (username) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      // Check cache first
      if (portfolioCache.has(username)) {
        setData(portfolioCache.get(username));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const result = await dbService.getPortfolioByUsername(username);
        if (result) {
          portfolioCache.set(username, result);
          setData(result);
        } else {
          setError('Portfolio not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { data, loading, error };
};
