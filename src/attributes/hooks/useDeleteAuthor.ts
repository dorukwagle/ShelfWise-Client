import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { AUTHORS_CACHE_KEY } from "../../entities/constants";
import authorService from "../services/authorServices";
import Author from "../entities/Author";

const useDeleteAuthor = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Author, AxiosError<ErrorRes>, string>({
    mutationFn: (authorId: string) => authorService.delete(authorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTHORS_CACHE_KEY });
      onSuccess && onSuccess();
    },
  });
};

export default useDeleteAuthor;



