import { useQuery } from "@tanstack/react-query";
import PaginationParams from "../../../entities/PaginationParams";
import PaginationResponse from "../../../entities/PaginationResponse";
import { DAY, ISSUANCE_CACHE_KEY } from "../../../entities/constants";
import issuanceService from "../services/issuanceService";
import { Issue } from "../entities/issues";

interface Params {
    seed?: string;
    status?: "Pending" | "Completed";
}

const useIssuance = ({ seed }: Params) => {

    const params: PaginationParams = {
        page: 1,
        pageSize: 15,
        seed,
    };

    return useQuery<PaginationResponse<Issue>>({
        queryKey: [...ISSUANCE_CACHE_KEY, params],
        queryFn: () => issuanceService.get('', params),
        staleTime: DAY,
    });
}

export default useIssuance;