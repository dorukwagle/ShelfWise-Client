import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { user } from "../entities/UserManagement";

import PaginationResponse from "../../entities/PaginationResponse";
import { USER_CACHE_KEY, DAY } from "../../entities/constants";
import userService from "../services/userService";
import PaginationParams from "../../entities/PaginationParams";

const useSearchUsers = (searchTerm: string) => {
    console.log("Query Parameters:", { searchTerm }); 

    const params: PaginationParams = {
      page: 1,
      pageSize: 15,
      seed: searchTerm,
  };

    return useQuery<PaginationResponse<user>, AxiosError>({
      queryKey: [...USER_CACHE_KEY, 'search', searchTerm],
      queryFn: () => userService.get('', params),
      staleTime: DAY,
      enabled: !!searchTerm,
    });
  };

export default useSearchUsers;