import axios from 'axios';
import { ApiResponse, FilterState } from '../entities/BookType';
import APIClient from '../../services/apiClient';
import { BookAddition } from "../entities/BookAddition";

export const BookService = {
  getBooks: async ({
    pageParam = 1,
    filters
  }: {
    pageParam?: number;
    filters: FilterState;
  }): Promise<ApiResponse> => {
    const params = new URLSearchParams();

    // Add all non-undefined filters to params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, String(value));
      }
    });

    params.append('page', pageParam.toString());

    try {
      const api = new APIClient<any, ApiResponse>("/books");
      const data = await api.get('', filters);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch books');
      }
      throw error;
    }
  }
};


export const addExistingBook = async (bookData: BookAddition) => {
  const api = new APIClient<any, BookAddition>(`/books/add-existing/${bookData.bookInfoId}`);
  const data = await api.post(bookData);
  return data;
};
