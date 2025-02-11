import { useMutation, useQueryClient } from "@tanstack/react-query";
import User from "../entities/User";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import Author from "../entities/Author";
import authorService from "../services/authorServices";
import { AUTHORS_CACHE_KEY } from "../entities/constants";


const useAuthor = (onSuccess?: () => void) => {
    const queryClient = useQueryClient();

    return useMutation<User, AxiosError<ErrorRes>, Author>({
        mutationFn: (body: Author) =>
            authorService.setSubroute("/authors").post(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: AUTHORS_CACHE_KEY });
            onSuccess && onSuccess()
        }
    })
}

export default useAuthor;