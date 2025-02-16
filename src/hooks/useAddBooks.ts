import { useMutation, useQueryClient } from "@tanstack/react-query";
import bookService from "../services/bookServices";
import { BOOKS_CACHE_KEY } from "../entities/constants";

const useAddBook = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<FormData, FormData, FormData>({
    mutationFn: (newBook: FormData) => {
      // const formData = new FormData();
      // Object.keys(newBook).forEach(key => {
      //   formData.append(key, (newBook as any)[key]);
      // });

      // formData.append("bookNumber", newBook.bookNumber)
      console.log("Payload sent to API:", newBook);
      return bookService.post(newBook, {
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
