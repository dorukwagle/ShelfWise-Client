import { useMutation, useQueryClient } from "@tanstack/react-query";
// import bookService from "../services/bookServices";
import { BOOKS_CACHE_KEY } from "../../entities/constants";
import { AxiosError } from "axios";
import { addBookService } from "../services/bookService";

const useAddBook = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<FormData, AxiosError, FormData>({
    mutationFn: (newBook: FormData) => {
      return addBookService.post(newBook, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
        }
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_CACHE_KEY });
      onSuccess && onSuccess();
    },
  });
};

export default useAddBook;
