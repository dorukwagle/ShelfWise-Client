import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import { PUBLISHERS_CACHE_KEY } from "../entities/constants";
import Publisher from "../entities/Publisher";
import publisherService from "../services/publisherService";

const useAddPublisher = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Publisher, AxiosError<ErrorRes>, Publisher>({
    mutationFn: (body: Publisher) =>
      publisherService.post(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUBLISHERS_CACHE_KEY });
      onSuccess && onSuccess();
    },
  });
};

export default useAddPublisher;




