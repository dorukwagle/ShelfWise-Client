import { useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../entities/User";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import { USER_CACHE_KEY } from "../entities/constants";
import registrationService from "../services/registrationService";

const useRegistration = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<ErrorRes>, User>({
    mutationFn: (body: User) =>
      registrationService.setSubroute("/request").post(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_CACHE_KEY });
      onSuccess && onSuccess();
    },
  });
};

export default useRegistration;