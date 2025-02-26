import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { addExistingBook } from "../services/bookService";
import { BookAddition } from "../entities/BookAddition";

const useAddExistingBook = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorRes>, BookAddition>({
    mutationFn: (bookData) => addExistingBook(bookData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      onSuccess && onSuccess();
    },
  });
};

export default useAddExistingBook;
