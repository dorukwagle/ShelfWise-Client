import { useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../entities/User";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import Author from "../entities/Author";
import authorService from "../services/authorServices";
import { AUTHORS_CACHE_KEY } from "../entities/constants";

const useAddAuthor = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<Author, AxiosError<ErrorRes>, Author>({
        mutationFn: (body: Author) =>
            authorService.post(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AUTHORS_CACHE_KEY });
            onSuccess && onSuccess()
        }
    })
}

export default useAddAuthor;



