import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { USERS_CACHE_KEY } from "../../entities/constants";
import userService from "../services/userService";

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ErrorRes>,
    { userId: string; roleId: string }
  >({
    mutationFn: ({ userId, roleId }) =>
      userService.setSubroute("user-role").put(`${userId}/${roleId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_CACHE_KEY });
    },
  });
};

export default useUpdateUserRole;
