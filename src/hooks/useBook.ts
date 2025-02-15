import { useInfiniteQuery } from '@tanstack/react-query';
import { Book, FilterState } from '../entities/BookType';
import { BookService } from '../services/bookService';

export interface UseBooksReturn {
  books: Book[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  totalItems: number;
  isRefetching: boolean;
}

export const useBooks = (filters: FilterState): UseBooksReturn => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    isRefetching
  } = useInfiniteQuery({
    queryKey: ['books', filters],
    queryFn: ({ pageParam }) => BookService.getBooks({ pageParam, filters }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.info.hasNextPage) return undefined;
      return lastPage.data.length ? Number(lastPage.data[0]) + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false
  });

  const books = data?.pages.flatMap(page => page.data) ?? [];
  const totalItems = data?.pages[0]?.info.itemsCount ?? 0;

  return {
    books,
    isLoading,
    isError,
    error: error as Error | null,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    fetchNextPage,
    totalItems,
    isRefetching
  };
};