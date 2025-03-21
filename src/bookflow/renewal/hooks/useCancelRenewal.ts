import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { cancelRenewal } from "../services/renewalService";
import { RENEWAL_CACHE_KEY } from "../../../entities/constants";

const useCancelRenewal = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationFn: (renewalId: string) => cancelRenewal(renewalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RENEWAL_CACHE_KEY
       });
    },
    onError: (error) => {
      console.error("Failed to cancel renewal:", error.message);
    },
  });
};

export default useCancelRenewal;