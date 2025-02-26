import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { PUBLISHERS_CACHE_KEY } from "../../entities/constants";
import publisherService from "../services/publisherService";
import Publisher from "../entities/Publisher";

const useDeletePublisher = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Publisher, AxiosError<ErrorRes>, string>({
    mutationFn: (publisherId: string) => publisherService.delete(publisherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PUBLISHERS_CACHE_KEY });
      onSuccess && onSuccess();
    },
  });
};

export default useDeletePublisher;