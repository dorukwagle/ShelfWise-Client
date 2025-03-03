import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Genre from "../entities/Genre";
import { GENRES_CACHE_KEY, DAY } from "../../entities/constants";
import genreSearchService from "../services/GenreSearchService";
import PaginationResponse from "../../entities/PaginationResponse";

const useSearchGenres = (searchTerm: string) => {
  return useQuery<PaginationResponse<Genre>, AxiosError>({
    queryKey: [...GENRES_CACHE_KEY, 'search', searchTerm],
    queryFn: () => genreSearchService.searchGenres(searchTerm),
    staleTime: DAY,
    enabled: !!searchTerm,  
  });
};

export default useSearchGenres;
