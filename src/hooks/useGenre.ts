import { useMutation, useQueryClient } from "@tanstack/react-query"
import User from "../entities/User";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import Genre from "../entities/Genre";
import genreService from "../services/genreService";
import { USER_CACHE_KEY } from "../entities/constants";

const useGenre = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<User, AxiosError<ErrorRes>, Genre>({
        mutationFn: (body: Genre) =>
            genreService.setSubroute("/genres").post(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: USER_CACHE_KEY});
            onSuccess && onSuccess();
        }
    })
}

export default useGenre;