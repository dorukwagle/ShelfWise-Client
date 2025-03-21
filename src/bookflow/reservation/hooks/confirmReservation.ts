import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { BookInfo } from "../../../book/entities/BookType";
import { ErrorRes } from "../../../entities/ErrorRes";
import reservationService from "../services/reservations";
import { NOTIFICATION_COUNT_CACHE_KEY, RESERVATION_CACHE_KEY } from "../../../entities/constants";

const useConfirmReservation = (bookReservationId: string) => {
    const queryClient = useQueryClient();
    console.log(bookReservationId);

    return useMutation<BookInfo, AxiosError<ErrorRes>>({
        mutationFn: () => reservationService.setSubroute(`confirm/${bookReservationId}`,).post(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RESERVATION_CACHE_KEY });  
            queryClient.invalidateQueries({ queryKey: NOTIFICATION_COUNT_CACHE_KEY });
        }
    });
}

export default useConfirmReservation;
