import { useQuery } from "@tanstack/react-query";
import PaginationParams from "../../entities/PaginationParams";
import { DAY, RESERVATION_CACHE_KEY } from "../../entities/constants";
import { ReservationsResponse } from "../entities/reservations";
import { AxiosError } from "axios";
import { assignableBooksService } from "../services/reservations";

interface Params extends PaginationParams {
    status?: "Pending" | "Confirmed" | "Cancelled" | "Resolved";
    reservationId?: string; // Added reservationId
  }
  
  const fetchAssignables = (params: Params) => {
    const {  reservationId , seed = '', page = 1, pageSize = 10, status,} = params;
    console.log(params);
    
    // Create the params object for the API call
    const queryParams: PaginationParams & { status?: string } = {
      page,
      pageSize,
      seed,
      ...(status && { status }),
    };
    
  
    return useQuery<ReservationsResponse, AxiosError>({
      queryKey: [...RESERVATION_CACHE_KEY, queryParams],
      queryFn: () => assignableBooksService.get(reservationId, queryParams),
      staleTime: DAY,
    });
  };
  
  export default fetchAssignables;
  