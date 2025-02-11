import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Genre from "../entities/genre";
import genreService from "../services/genreService";
import { ErrorRes } from "../entities/ErrorRes";

const useGenre = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Genre, AxiosError<ErrorRes>, Genre>({
    mutationFn: (body: Genre) => genreService.post(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["genres"] });
      onSuccess && onSuccess();
    },
  });
};

export default useGenre;
