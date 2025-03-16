import { useQuery } from "@tanstack/react-query";
import PaginationParams from "../../entities/PaginationParams";
import { DAY, PAYMENT_CACHE_KEY } from "../../entities/constants";
import { getPaymentHistories} from "../services/paymentService";

interface PaymentParams extends PaginationParams {
  userId?: string;
  status?: "Pending" | "Completed";
}

const usePaymentHistory = (params: PaymentParams) => {
  const { userId, status, seed = '', page = 1, pageSize = 10 } = params;
  
  // Create the params object for the API call
  const queryParams: PaginationParams & { status?: string} = {
    page,
    pageSize,
    seed,
    ...(status && { status }),
  };
  
  return useQuery({
    // Include userId directly in the queryKey to ensure different cache entries per user
    queryKey: [...PAYMENT_CACHE_KEY, userId, status, page, pageSize],
    queryFn: () => getPaymentHistories.get(`${userId}`, queryParams),
    staleTime: DAY,
    // Only enable the query when we have a valid userId
    enabled: !!userId && userId !== "",
  });
};

export default usePaymentHistory;