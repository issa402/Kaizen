import { useState, useEffect } from 'react';
import { NewsItem } from '../types/news';
import { fetchInspirationalNews } from '../services/newsService';

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await fetchInspirationalNews();
        setNews(data);
      } catch (err) {
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    // Refresh news every 30 minutes
    const interval = setInterval(fetchNews, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { news, loading, error };
}