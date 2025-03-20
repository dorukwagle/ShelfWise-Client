import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { rejectRenewal } from "../services/renewalService";
import { RENEWAL_CACHE_KEY } from "../../../entities/constants";

const useRejectRenewal = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, string>({
    mutationFn: (renewalId: string) => rejectRenewal(renewalId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RENEWAL_CACHE_KEY
       });
    },
    onError: (error) => {
      console.error("Failed to cancel renewal:", error.message);
    },
  });
};

export default useRejectRenewal;