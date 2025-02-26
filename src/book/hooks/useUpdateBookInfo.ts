import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookService from "../services/bookServices";
import { BOOKS_CACHE_KEY } from "../../entities/constants";
import { ErrorRes } from "../../entities/ErrorRes";
import { AxiosError } from "axios";
import Book from "../entities/Book";

const useUpdateBookInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<Book, AxiosError<ErrorRes>, Book>({
    mutationFn: (body: Book) => {
      console.log(body);
      return bookService.put(body.bookInfoId || "", body);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: BOOKS_CACHE_KEY }),
  });
};

export default useUpdateBookInfo;