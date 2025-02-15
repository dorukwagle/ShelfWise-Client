import { z } from 'zod';

export const BookSort = z.enum([
  "ratings_asc",
  "ratings_desc",
  "pub_date_asc",
  "pub_date_desc",
  "added_date_asc",
  "added_date_desc",
]);

export const BookFilter = z.object({
  page: z.number().optional(),
  pageSize: z.number().default(10),
  seed: z.string().optional(),
  genre: z.string().optional(),
  author: z.string().optional(),
  publisher: z.string().optional(),
  sort: BookSort.optional(),
});

export type BookSortType = z.infer<typeof BookSort>;
export type FilterState = z.infer<typeof BookFilter>;

export interface Book {
  id: string;
  title: string;
  subTitle?: string;
  publisher: {
    name: string;
  };
  score: number;
  bookGenres: Array<{
    genre: {
      name: string;
    };
  }>;
  bookAuthors: Array<{
    author: {
      name: string;
    };
  }>;
}

export interface PaginationInfo {
  hasNextPage: boolean;
  itemsCount: number;
}

export interface ApiResponse {
  data: Book[];
  info: PaginationInfo;
  statusCode: number;
}