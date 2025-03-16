import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import issuanceService from "../../issuance/services/issuanceService";
import { RESERVATION_CACHE_KEY } from "../../../entities/constants";
import { ErrorRes } from "../../../entities/ErrorRes";

interface IssueBookParams {
    reservationId: string;
    userId: string;
    barcode: string;
}

const useIssueReservation = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<ErrorRes>, IssueBookParams>({
        mutationFn: ({ reservationId, userId, barcode }) =>
            issuanceService.setSubroute('/issue').put(`${reservationId}/${userId}`, { reservationId, userId, barcode }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RESERVATION_CACHE_KEY });
            onSuccess && onSuccess();
        },
        onError: (error) => {
            console.error("Failed to issue book:", error.response?.data || error.message);
        },
    });
};

export default useIssueReservation;