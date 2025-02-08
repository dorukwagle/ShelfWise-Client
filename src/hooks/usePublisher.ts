import { useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../entities/User";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import { USER_CACHE_KEY } from "../entities/constants";
import Publisher from "../entities/Publisher";
import publisherService from "../services/publisherService";

const usePublisher = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<User, AxiosError<ErrorRes>, Publisher>({
    mutationFn: (body: Publisher) =>
      publisherService.setSubroute("/publishers").post(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_CACHE_KEY });
      onSuccess && onSuccess();
    },
  });
};

export default usePublisher;
