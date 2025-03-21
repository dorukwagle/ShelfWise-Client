import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { assignReservationService } from "../services/reservations";
import { BookReservation } from "../entities/BookReservation";
import { ErrorRes } from "../../../entities/ErrorRes";
import { RESERVATION_CACHE_KEY } from "../../../entities/constants";

const useAssignReservation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<BookReservation, AxiosError<ErrorRes>, BookReservation>({
        mutationFn: (body: BookReservation) =>
            assignReservationService.post(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RESERVATION_CACHE_KEY });
            onSuccess && onSuccess()
        }
    })
}

export default useAssignReservation;



