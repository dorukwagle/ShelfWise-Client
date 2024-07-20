import { useQuery } from "@tanstack/react-query";
import { DAY, USER_ROLES_KEY } from "../entities/constants";
import roleService from "../services/roleService";
import UserRoles from "../entities/UserRoles";

const useDetailedUserRoles = () => {
  return useQuery<UserRoles[]>({
    queryKey: USER_ROLES_KEY,
    queryFn: () => roleService<UserRoles[]>().get("detailed"),
    staleTime: DAY,
  });
};

export default useDetailedUserRoles;
