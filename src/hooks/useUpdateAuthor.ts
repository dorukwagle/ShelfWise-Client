import { useMutation, useQueryClient } from "@tanstack/react-query";
import Author from "../entities/Author";
import { AxiosError } from "axios";
import { ErrorRes } from "../entities/ErrorRes";
import { AUTHORS_CACHE_KEY } from "../entities/constants";
import authorService from "../services/authorServices";

const useUpdateAuthor = () => {
  const queryClient = useQueryClient();

  return useMutation<Author, AxiosError<ErrorRes>, Author>({
    mutationFn: (body: Author) => authorService.put(body.authorId || "", body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: AUTHORS_CACHE_KEY }),
  });
}

export default useUpdateAuthor;

