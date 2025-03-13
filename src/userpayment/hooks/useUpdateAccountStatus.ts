import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import userService from "../services/userService";
import { USERS_CACHE_KEY } from "../../entities/constants";

interface UpdateAccountStatusParams {
  userId: string;
  status: string;
}

const useUpdateAccountStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorRes>, UpdateAccountStatusParams>({
    mutationFn: ({ userId, status }: UpdateAccountStatusParams) => userService.put(`/account-status/${userId}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: USERS_CACHE_KEY }),
  });
};

export default useUpdateAccountStatus;
