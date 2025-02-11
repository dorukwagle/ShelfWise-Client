import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import BookInfo from "../entities/bookInfo";
import bookInfoService from "../services/bookInfoService";
import { ErrorRes } from "../entities/ErrorRes";

const useBookInfo = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<BookInfo, AxiosError<ErrorRes>, BookInfo>({
    mutationFn: (body: BookInfo) => bookInfoService.post(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["book-info"] });
      onSuccess && onSuccess();
    },
  });
};

export default useBookInfo;
