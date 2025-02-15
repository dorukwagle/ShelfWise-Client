import axios from 'axios';
import { ApiResponse, FilterState } from '../entities/BookType';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

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
    
    // Add page parameter
    params.append('page', pageParam.toString());

    try {
      console.log('yes');
      
      const { data } = await api.get<ApiResponse>(`/books?${params}`);
      // const { data } = new APIClient<any, Genre>("/attributes/genres");
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch books');
      }
      throw error;
    }
  }
};