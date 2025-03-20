import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { requestRenewal } from "../services/renewalService";
import { Renewal } from "../../issuance/entities/Renewal";
import { RENEWAL_CACHE_KEY } from "../../../entities/constants";

interface RequestRenewalParams {
  issueId: string;
}

const useRequestRenewal = () => {
  const queryClient = useQueryClient();
  return useMutation<Renewal, AxiosError, RequestRenewalParams>({
    mutationFn: ({ issueId }) => requestRenewal(issueId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RENEWAL_CACHE_KEY
       });
    },
    onError: (error) => {
      console.error("Failed to cancel renewal:", error.message);
    },
  });
};

export default useRequestRenewal;