import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { BOOKS_CACHE_KEY } from "../../entities/constants";
import bookService from "../services/bookServices";

const useUpdateGenres = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorRes>, { infoId: string; genres: string[] }>({
    mutationFn: ({ infoId, genres }) => {
      const data = {
        bookGenres: genres
      };
      console.log(data);
      return bookService.put(`${infoId}/genres`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_CACHE_KEY });
    },
  });
};

export default useUpdateGenres;