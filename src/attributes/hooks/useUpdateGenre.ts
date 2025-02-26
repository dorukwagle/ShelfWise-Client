import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorRes } from "../../entities/ErrorRes";
import { AxiosError } from "axios";
import Genre from "../entities/Genre";
import genreService from "../services/genreService";
import { GENRES_CACHE_KEY } from "../../entities/constants";


const useUpdateGenre = () => {
  const queryClient = useQueryClient();

  return useMutation<Genre, AxiosError<ErrorRes>, Genre>({
    mutationFn: (body: Genre) => genreService.put(body.genreId || "", body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: GENRES_CACHE_KEY }),
  });
};

export default useUpdateGenre;
