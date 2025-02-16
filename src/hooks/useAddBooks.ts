import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Book from "../entities/Book";
import bookService from "../services/bookServices";
import { BOOKS_CACHE_KEY } from "../entities/constants";
import { ErrorRes } from "../entities/ErrorRes";

const useAddBook = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, any>({
    mutationFn: (newBook: FormData) => {
      const formData = new FormData();
      Object.keys(newBook).forEach(key => {
        formData.append(key, (newBook as any)[key]);
      });

      // formData.append("bookNumber", newBook.bookNumber)
      console.log("Payload sent to API:", newBook);
      return bookService.post(formData, {
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
