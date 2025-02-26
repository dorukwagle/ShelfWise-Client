import { useMutation, useQueryClient } from "@tanstack/react-query";
import Publisher from "../entities/Publisher";
import publisherService from "../services/publisherService";
import { PUBLISHERS_CACHE_KEY } from "../../entities/constants";
import { ErrorRes } from "../../entities/ErrorRes";
import { AxiosError } from "axios";


const useUpdatePublisher = () => {
  const queryClient = useQueryClient();

  return useMutation<Publisher, AxiosError<ErrorRes>, Publisher>({
    mutationFn: (body: Publisher) => publisherService.put(body.publisherId || "", body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: PUBLISHERS_CACHE_KEY }),
  });
};

export default useUpdatePublisher;