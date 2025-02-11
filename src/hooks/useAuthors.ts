import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Author from "../entities/Author";
import { AUTHORS_CACHE_KEY, DAY } from "../entities/constants";
import authorService from "../services/authorServices";
import PaginationParams from "../entities/PaginationParams";
import PaginationResponse from "../entities/PaginationResponse";

const useAuthors = ({ seed }: PaginationParams) => {
  const params: PaginationParams = {
    page: 1,
    pageSize: 15,
    seed,
  };

  return useQuery<PaginationResponse<Author>, AxiosError>({
    queryKey: [...AUTHORS_CACHE_KEY, params],
    queryFn: () => authorService.get("", params),
    staleTime: DAY,
  });
};

export default useAuthors;


