import axios from 'axios';
import Author from '../entities/Author';
import PaginationResponse from '../../entities/PaginationResponse';
import { BASE_URL } from '../../entities/constants';

const searchService = {
    async searchAuthors(searchTerm: string): Promise<PaginationResponse<Author>> {
      const response = await axios.get(`${BASE_URL}/attributes/authors`, {
        params: { seed: searchTerm },  
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });
      return response.data;
    },
  };
  
  export default searchService;