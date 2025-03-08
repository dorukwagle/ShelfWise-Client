import { useState, useEffect } from 'react';
import { BookInfo } from '../entities/BookType';
import { getBookInfo } from '../services/bookInfoService';

export const useBookInfo = (bookInfoId: string) => {
  const [data, setData] = useState<BookInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await getBookInfo(bookInfoId);
        console.log("oo");
        console.log(result);
        console.log("oo");
        
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch book info'));
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