import { useQuery } from "@tanstack/react-query";
import PaginationParams from "../../../entities/PaginationParams";
import PaginationResponse from "../../../entities/PaginationResponse";
import { DAY, RESERVATION_CACHE_KEY } from "../../../entities/constants";
import { BookReservation, EReservationStatus } from "../entities/BookReservation";
import reservationService from "../services/reservations";

export interface ReservationFilterParams {
    status?: EReservationStatus;
    searchQuery?: string;
}

interface Params extends ReservationFilterParams {
    seed?: string;
}

const useReservation = ({ status, searchQuery }: Params) => {
    const params: PaginationParams & ReservationFilterParams = {
        page: 1,
        pageSize: 15,
        status,
        searchQuery,
    };

    return useQuery<PaginationResponse<BookReservation>>({
        queryKey: [...RESERVATION_CACHE_KEY, params],
        queryFn: () => reservationService.get('', params),
        staleTime: DAY,
    });
};

export default useReservation;