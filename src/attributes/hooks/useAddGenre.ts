import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import Genre from "../entities/Genre";
import genreService from "../services/genreService";
import { GENRES_CACHE_KEY } from "../../entities/constants";

const useAddGenre = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<Genre, AxiosError<ErrorRes>, Genre>({
        mutationFn: (body: Genre) =>
            genreService.post(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: GENRES_CACHE_KEY});
            onSuccess && onSuccess();
        }
    });
}

export default useAddGenre;

