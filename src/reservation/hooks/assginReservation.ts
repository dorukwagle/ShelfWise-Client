import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { AUTHORS_CACHE_KEY, RESERVATION_CACHE_KEY } from "../../entities/constants";
import { Reservation } from "../entities/reservations";
import { assignReservationService } from "../services/reservations";

const useAssignReservation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<Reservation, AxiosError<ErrorRes>, Reservation>({
        mutationFn: (body: Reservation) =>
            assignReservationService.post(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RESERVATION_CACHE_KEY });
            onSuccess && onSuccess()
        }
    })
}

export default useAssignReservation;



