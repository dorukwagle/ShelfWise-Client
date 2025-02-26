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

export interface BookInfo {
  bookInfoId: string;
  classNumber: string;
  bookNumber: string;
  title: string;
  subTitle?: string;
  editionStatement?: string;
  numberOfPages: bigint;
  publicationYear: number;
  seriesStatement?: string;
  addedDate: Date;
  coverPhoto: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bookAuthors: BookWithAuthors[];
  publisherId: string;
  publisher: Publishers;
  isbns: Isbn[];
  bookGenres: BookWithGenres[];
  books: Books[];
  purchases: BookPurchases[];
  reservations: BookReservations[];
  comments: Comments[];
  ratings: Ratings[];
  score: BookRatingScore[];
}

export interface BookWithAuthors {
  authorId: string;
  bookAuthorId: string;
  bookInfoId: string;
  name: string;
}

export interface Publishers {
  publisherId: string;
  publisherName: string;
  name: string;
}

export interface Isbn {
  isbn: string;
}

export interface BookWithGenres {
  bookGenreId: string;
  bookInfoId: string;
  genreId: string;
  createdAt: string;
}

export interface Books {
  bookId: string;
  status: string;
}

export interface BookPurchases {
  purchaseId: string;
  date: Date;
}

export interface BookReservations {
  reservationId: string;
  userId: string;
  reservedDate: Date;
}

export interface Comments {
  commentId: string;
  userId: string;
  text: string;
  createdAt: Date;
}

export interface Ratings {
  ratingId: string;
  userId: string;
  score: number;
}

export interface BookRatingScore {
  scoreId: string;
  score: number;
  averageScore: number;
}


export interface PaginationInfo {
  hasNextPage: boolean;
  itemsCount: number;
}

export interface ApiResponse {
  data: BookInfo[];
  info: PaginationInfo;
  statusCode: number;
}