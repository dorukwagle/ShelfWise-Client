import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";

import { RESERVATION_CACHE_KEY } from "../../entities/constants";
import { BookInfo } from "../../book/entities/BookType";
import reservationService from "../services/reservations";

const useConfirmReservation = (bookReservationId: string) => {
    const queryClient = useQueryClient();
    console.log(bookReservationId);

    return useMutation<BookInfo, AxiosError<ErrorRes>>({
        mutationFn: () => reservationService.setSubroute(`confirm/${bookReservationId}`,).post(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RESERVATION_CACHE_KEY });  
        }
    });
}

export default useConfirmReservation;
