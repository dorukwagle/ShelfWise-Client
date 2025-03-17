import { useQuery } from "@tanstack/react-query";
import PaginationParams from "../../../entities/PaginationParams";
import { DAY, ASSIGNABLE_RESERVATION_CACHE_KEY } from "../../../entities/constants";
import { assignableBooksService } from "../services/reservations";
import { Books } from "../../../book/entities/BookType";

interface Params extends PaginationParams {
    status?: "Pending" | "Confirmed" | "Cancelled" | "Resolved";
    reservationId?: string;
  }
  
  const UseFetchAssignables = (params: Params) => {
    const {  reservationId , seed = '', page = 1, pageSize = 10, status,} = params;
    console.log(params);
    
    const queryParams: PaginationParams & { status?: string } = {
      page,
      pageSize,
      seed,
      ...(status && { status }),
    };
  
    return useQuery<Books>({
      queryKey: [...ASSIGNABLE_RESERVATION_CACHE_KEY, {reservationId, ...queryParams}],
      queryFn: () => assignableBooksService.get(reservationId, queryParams),
      staleTime: DAY,
      enabled: !!reservationId,
    });
  };
  
  export default UseFetchAssignables;
  