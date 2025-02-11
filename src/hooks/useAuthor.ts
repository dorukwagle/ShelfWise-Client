import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Author from "../entities/author";
import authorService from "../services/authorService";
import { ErrorRes } from "../entities/ErrorRes";

const useAuthor = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Author, AxiosError<ErrorRes>, Author>({
    mutationFn: (body: Author) => authorService.post(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      onSuccess && onSuccess();
    },
  });
};

export default useAuthor;
