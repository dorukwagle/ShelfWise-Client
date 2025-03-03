import axios from 'axios';

import Genre from '../entities/Genre';
import PaginationResponse from '../../entities/PaginationResponse';
import { BASE_URL } from '../../entities/constants';

const genreSearchService = {
  async searchGenres(searchTerm: string): Promise<PaginationResponse<Genre>> {
    const response = await axios.get(`${BASE_URL}/attributes/genres`, {
      params: { seed: searchTerm },  // Use the correct parameter for search
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    return response.data;
  },
};

export default genreSearchService;
