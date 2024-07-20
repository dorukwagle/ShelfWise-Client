import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import authService from "../services/authService";
import { ErrorRes } from "../entities/ErrorRes";
import { USER_CACHE_KEY } from "../entities/constants";

const useLogout = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<{}, AxiosError<ErrorRes>>({
    mutationFn: () =>
      authService.setSubroute("/logout").delete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_CACHE_KEY });
      onSuccess && onSuccess();
    },
  });
};

export default useLogout;
