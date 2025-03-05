import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { BOOKS_CACHE_KEY } from "../../entities/constants";
import bookService from "../services/bookServices";

const useUpdateAuthors = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorRes>, { infoId: string; authors: string[] }>({
    mutationFn: ({ infoId, authors }) => {
      const data = {
        bookAuthors: authors
      };
      console.log(data);
      return bookService.put(`${infoId}/authors`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_CACHE_KEY });
    },
  });
};

export default useUpdateAuthors;