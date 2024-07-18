import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "../services/meService";
import { AxiosError } from "axios";
import authService, { AuthRequest } from "../services/authService";
import { ErrorRes } from "../entities/ErrorRes";
import { USER_CACHE_KEY } from "../entities/constants";


const useLogin = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<User, AxiosError<ErrorRes>, AuthRequest>(
        {
            mutationFn: (body: AuthRequest) => authService.setSubroute("/login").post(body),
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey: USER_CACHE_KEY});
                onSuccess && onSuccess();
            }
        }
    );
};

export default useLogin;