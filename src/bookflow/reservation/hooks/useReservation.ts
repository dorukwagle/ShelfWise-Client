import { useQuery } from "@tanstack/react-query";
import PaginationParams from "../../../entities/PaginationParams";
import PaginationResponse from "../../../entities/PaginationResponse";
import { DAY, RESERVATION_CACHE_KEY } from "../../../entities/constants";
import { BookReservation } from "../entities/BookReservation";
import reservationService from "../services/reservationServices";

interface Params {
    seed?: string;
    status?: "Pending" | "Completed";
}

const useReservation = ({ seed }: Params) => {

    const params: PaginationParams = {
        page: 1,
        pageSize: 15,
        seed,
    };

    return useQuery<PaginationResponse<BookReservation>>({
        queryKey: [...RESERVATION_CACHE_KEY, params],
        queryFn: () => reservationService.get('', params),
        staleTime: DAY,
    });
}

export default useReservation;