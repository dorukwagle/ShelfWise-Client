import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Publisher from "../entities/Publisher";
import { PUBLISHERS_CACHE_KEY, DAY } from "../../entities/constants";
import publisherSearchService from "../services/publisherSearchService";
import PaginationResponse from "../../entities/PaginationResponse";

const useSearchPublishers = (searchTerm: string) => {
  return useQuery<PaginationResponse<Publisher>, AxiosError>({
    queryKey: [...PUBLISHERS_CACHE_KEY, 'search', searchTerm],
    queryFn: () => publisherSearchService.searchPublishers(searchTerm),
    staleTime: DAY,
    enabled: !!searchTerm,  
  });
};

export default useSearchPublishers;
