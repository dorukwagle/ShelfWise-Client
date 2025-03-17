import { useQuery } from "@tanstack/react-query";
import PaginationParams from "../../entities/PaginationParams";
import { PENALTIES_CACHE_KEY, DAY } from "../../entities/constants";
import { getPenalties } from "../services/paymentService";

interface PenaltyParams extends PaginationParams {
  userId?: string;
  status?: "Pending" | "Resolved";
}

const usePenalties = (params: PenaltyParams) => {
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
    queryKey: [...PENALTIES_CACHE_KEY, userId, status, page, pageSize],
    queryFn: () => getPenalties.get(`${userId}`, queryParams),
    staleTime: DAY,
    // Only enable the query when we have a valid userId
    enabled: !!userId && userId !== "",
  });
};

export default usePenalties;