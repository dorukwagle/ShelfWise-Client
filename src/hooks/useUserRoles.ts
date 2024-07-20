import { useQuery } from "@tanstack/react-query";
import { DAY, USER_ROLES_KEY } from "../entities/constants";
import roleService  from "../services/roleService";
import UserRolesRes from "../entities/UserRolesRes";

const useUserRoles = () => {
  return useQuery<UserRolesRes>({
    queryKey: USER_ROLES_KEY,
    queryFn: () => roleService<UserRolesRes>().get(),
    staleTime: DAY,
  });
};

export default useUserRoles;
