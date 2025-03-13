import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DAY, USER_ROLES_CACHE_KEY } from "../../entities/constants";
import roleService from "../services/roleService";

const useUserRoles = () => {
  return useQuery<any, AxiosError>({
    queryKey: USER_ROLES_CACHE_KEY,
    queryFn: () => roleService.get(),
    staleTime: DAY,
  });
};

export default useUserRoles;
