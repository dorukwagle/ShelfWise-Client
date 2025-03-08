import { useState, useEffect } from 'react';
import { RelatedBook } from '../entities/BookType';
import { getRelatedBooks } from '../services/bookInfoService';

export const useRelatedBooks = (bookInfoId: string) => {
  const [data, setData] = useState<RelatedBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getRelatedBooks(bookInfoId);
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch related books'));
      } finally {
        setIsLoading(false);
      }
    };

    if (bookInfoId) {
      fetchData();
    }
  }, [bookInfoId]);

  return { data, isLoading, error };
};