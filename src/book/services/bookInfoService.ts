import { BookInfo, RelatedBook } from '../entities/BookType';
import APIClient from '../../services/apiClient';

export const api = new APIClient<any, any>("/books")

export const getBookInfo = async (bookInfoId: string): Promise<BookInfo> => {
  const response = await api.get(`${bookInfoId}`);
  return response;
};

export const getRelatedBooks = async (bookInfoId: string): Promise<RelatedBook[]> => {
  const response = await api.get(`${bookInfoId}/related`);
  return response;
};

export const reserveBook = async (bookId: string, userId: string): Promise<any> => {
//   const response = await api.post('/reservations', { bookId, userId });
  const response = await api.post('/reservations', );
  return response;
};

export const requestBook = async (bookInfoId: string, userId: string): Promise<any> => {
//   const response = await api.post('/requests', { bookInfoId, userId });
  const response = await api.post('/requests', );
  return response;
};