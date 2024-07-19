import { EUserRoles } from "../entities/constants";
import useMe from "./useMe";
import useUserRoles from "./useUserRoles";

const useIsEmployee = () => {
    const {data: user, isLoading: userLoading} = useMe();
    const {data: roles, isLoading: rolesLoading} = useUserRoles();

   const isEmployee =  user?.role &&
      roles &&
      user.role.precedence > roles[EUserRoles.Member];

      const isLoading = userLoading || rolesLoading;
      return {
        isEmployee, isLoading
      };
};

export default useIsEmployee;