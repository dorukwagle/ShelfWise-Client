import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import genreService from "../services/genreService";
import { GENRES_CACHE_KEY } from "../../entities/constants";
import Genre from "../entities/Genre";

const useDeleteGenre = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Genre, AxiosError<ErrorRes>, string>({
    mutationFn: (genreId: string) => genreService.delete(genreId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GENRES_CACHE_KEY });
      onSuccess && onSuccess();
    },
  });
};

export default useDeleteGenre;
