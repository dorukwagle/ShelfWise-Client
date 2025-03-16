import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import PaginationParams from "../../entities/PaginationParams";
import PaginationResponse from "../../entities/PaginationResponse";
import { PENALTIES_CACHE_KEY, DAY } from "../../entities/constants";
import { getPenalties } from "../services/paymentService";
import { Penalty } from "../entities/payments";

interface PenaltyParams extends PaginationParams {
    userId?: string;
  }
  
  const usePenalties = ({ userId = "", page = 1, pageSize = 15, seed = "" }: PenaltyParams = { userId: "", page: 1, pageSize: 15, seed: "" }) => {
    const params: PenaltyParams = {
      userId,
      page,
      pageSize,
      seed,
    };
  
    return useQuery<PaginationResponse<Penalty>, AxiosError<ErrorRes>>({
      queryKey: [...PENALTIES_CACHE_KEY, params],
      queryFn: () => getPenalties.get("", params),
      staleTime: DAY,
      // Only run the query if userId is provided
      enabled: !!userId,
    });
  };
  
  export default usePenalties;