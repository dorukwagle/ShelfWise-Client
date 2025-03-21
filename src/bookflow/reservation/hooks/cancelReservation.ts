import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BookInfo } from "../../../book/entities/BookType";
import reservationService from "../services/reservations";
import { ErrorRes } from "../../../entities/ErrorRes";
import { RESERVATION_CACHE_KEY } from "../../../entities/constants";

const useCancelReservation = (bookReservationId: string) => {
    const queryClient = useQueryClient();
    console.log(bookReservationId);

    return useMutation<BookInfo, AxiosError<ErrorRes>>({
        mutationFn: () => reservationService.delete(`cancel/${bookReservationId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RESERVATION_CACHE_KEY });

      
        }
    });
}

export default useCancelReservation;
