import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import Enrollment from "../entities/enrollements";
import enrollmentService from "../services/enrollmentRequest";
import { ENROLL_CACHE_KEY} from "../entities/constants";

const useEnrollUser = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<Enrollment, AxiosError<ErrorRes>, Enrollment>({
        mutationFn: (body: Enrollment) =>
            enrollmentService.post(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ENROLL_CACHE_KEY});
            onSuccess && onSuccess();
        }
    });
}

export default useEnrollUser;