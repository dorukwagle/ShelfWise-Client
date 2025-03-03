import axios from 'axios';
import Publisher from '../entities/Publisher';
import PaginationResponse from '../../entities/PaginationResponse';
import { BASE_URL } from '../../entities/constants';

const publisherSearchService = {
  async searchPublishers(searchTerm: string): Promise<PaginationResponse<Publisher>> {
    const response = await axios.get(`${BASE_URL}/attributes/publishers`, {
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

export default publisherSearchService;
