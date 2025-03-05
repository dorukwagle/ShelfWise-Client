import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { BOOKS_CACHE_KEY } from "../../entities/constants";
import bookService from "../services/bookServices";

const useUpdateISBNs = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorRes>, { infoId: string; isbns: string[] }>({
    mutationFn: ({ infoId, isbns }) => {
      // const data = {
      //   ISBNs: isbns
      // };
      // console.log(data);
      return bookService.put(`${infoId}/isbns`, {isbns});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: BOOKS_CACHE_KEY });
    },
  });
};

export default useUpdateISBNs;