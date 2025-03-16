import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { RESOLVE_CACHE_KEY } from "../../entities/constants";
import { resolvePenalty } from "../services/paymentService";

const useResolvePayment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorRes>, { userId: string; penaltyId: string }>({
    mutationFn: ({ userId, penaltyId }) => {
      return resolvePenalty.put(`${userId}/${penaltyId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESOLVE_CACHE_KEY });
    },
  });
};

export default useResolvePayment;