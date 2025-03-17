import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import PaginationParams from "../../../entities/PaginationParams";
import PaginationResponse from "../../../entities/PaginationResponse";
import { BookReservation } from "../entities/BookReservation";
import { DAY, RESERVATION_CACHE_KEY } from "../../../entities/constants";
import reservationService from "../services/reservations";

interface Params extends PaginationParams {
  status?: "Pending" | "Confirmed" | "Cancelled" | "Resolved";
}

const fetchReservation = (params: Params) => {
  const { seed = '', page = 1, pageSize = 10, status } = params;
  
  // Create the params object for the API call
  const queryParams: PaginationParams = {
    page,
    pageSize,
    seed,
    ...(status && { status }) // Only add status if it's defined
  };

  return useQuery<PaginationResponse<BookReservation>, AxiosError>({
    queryKey: [...RESERVATION_CACHE_KEY, queryParams],
    queryFn: () => reservationService.get('', queryParams),
    staleTime: DAY,
    // keepPreviousData: true, // Keep previous data while loading new data
  });
};

export default fetchReservation;