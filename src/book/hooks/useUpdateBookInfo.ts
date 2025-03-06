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
      // Convert Book object to FormData
      const formData = new FormData();
      Object.keys(body).forEach(key => {
        if (Array.isArray((body as any)[key])) {
          (body as any)[key].forEach((item: any, index: number) => {
            formData.append(`${key}[${index}]`, JSON.stringify(item));
          });
        } else {
          formData.append(key, (body as any)[key]);
        }
      });
      return bookService.put(body.bookInfoId || "", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_CACHE_KEY });
    },
  });
};

export default useUpdateBookInfo;