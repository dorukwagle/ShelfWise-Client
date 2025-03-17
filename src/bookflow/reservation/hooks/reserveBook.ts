import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../../entities/ErrorRes";
import { reserveBook } from "../services/reservations";
import { RESERVATION_CACHE_KEY } from "../../../entities/constants";

const useReserveBook = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<any, AxiosError<ErrorRes>, string>({
        mutationFn: (bookInfoId: string) => reserveBook(bookInfoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: RESERVATION_CACHE_KEY });
            onSuccess && onSuccess();
        }
    }); 
};

export default useReserveBook;



