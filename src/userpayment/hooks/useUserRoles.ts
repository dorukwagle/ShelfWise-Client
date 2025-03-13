import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { user } from "../entities/UserManagement";
import { DAY, USER_ROLES_CACHE_KEY } from "../../entities/constants";
import PaginationResponse from "../../entities/PaginationResponse";
import roleService from "../services/roleService";

const useUserRoles = () => {
  return useQuery<PaginationResponse<user>, AxiosError>({
    queryKey: USER_ROLES_CACHE_KEY,
    queryFn: () => roleService.get(),
    staleTime: DAY,
  });
};

export default useUserRoles;
