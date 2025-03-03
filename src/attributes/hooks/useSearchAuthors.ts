import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Author from "../entities/Author";
import { AUTHORS_CACHE_KEY, DAY } from "../../entities/constants";
import searchService from "../services/searchService";
import PaginationResponse from "../../entities/PaginationResponse";

const useSearchAuthors = (searchTerm: string) => {
  return useQuery<PaginationResponse<Author>, AxiosError>({
    queryKey: [...AUTHORS_CACHE_KEY, 'search', searchTerm],
    queryFn: () => searchService.searchAuthors(searchTerm),
    staleTime: DAY,
    enabled: !!searchTerm,  
  });
};

export default useSearchAuthors;

