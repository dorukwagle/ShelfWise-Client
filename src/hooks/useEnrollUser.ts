import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import User from "../entities/User";
import enrollmentService from "../services/enrollmentRequest";
import { ENROLL_CACHE_KEY} from "../entities/constants";

const useEnrollUser = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<User, AxiosError<ErrorRes>, User>({
        mutationFn: (body: User) =>
            enrollmentService.post(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ENROLL_CACHE_KEY});
            onSuccess && onSuccess();
        }
    });
}

export default useEnrollUser;

