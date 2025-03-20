import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { user } from "../entities/UserManagement";
import { DAY, USERS_CACHE_KEY } from "../../entities/constants";
import userService from "../services/userService";
import PaginationParams from "../../entities/PaginationParams";
import PaginationResponse from "../../entities/PaginationResponse";

const useUsers = ({ seed, accountStatus, expired }: PaginationParams) => {
  const params = { page: 1, pageSize: 15, seed, accountStatus, expired };

  return useQuery<PaginationResponse<user>, AxiosError>({
    queryKey: [...USERS_CACHE_KEY, params],
    queryFn: () => userService.get("", params),
    staleTime: DAY,
  });
};

export default useUsers;