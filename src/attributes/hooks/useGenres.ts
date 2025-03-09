import { useQuery } from "@tanstack/react-query";
import { DAY, GENRES_CACHE_KEY } from "../../entities/constants";
import PaginationParams from "../../entities/PaginationParams";
import PaginationResponse from "../../entities/PaginationResponse";
import genreService from "../services/genreService";
import Genre from "../entities/Genre";

interface Params {
    seed?: string;
    status?: "Pending" | "Completed";
}

const useGenres = ({ seed }: Params) => {

    const params: PaginationParams = {
        page: 1,
        pageSize: 15,
        seed,
    };

    return useQuery<PaginationResponse<Genre>>({
        queryKey: [...GENRES_CACHE_KEY, params],
        queryFn: () => genreService.get('', params),
        staleTime: DAY,
    });
}

export default useGenres;