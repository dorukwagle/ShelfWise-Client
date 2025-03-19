import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import issuanceService from "../services/issuanceService";

interface ReturnBookParams {
  issueId: string;
}

const useReturnBook = () => {
  return useMutation<void, AxiosError, ReturnBookParams>({
    mutationFn: ({ issueId }) => issuanceService.setSubroute(`/issues/return/${issueId}`).post(),
    onSuccess: () => {
    },
    onError: (error) => {
      console.error("Failed to return book:", error.message);
    },
  });
};

export default useReturnBook;