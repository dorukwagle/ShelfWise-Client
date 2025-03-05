import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DAY, ENROLL_CACHE_KEY } from "../../entities/constants";
import enrollmentFetchService from "../services/enrollmentFetchService";
import PaginationResponse from "../../entities/PaginationResponse";
import PaginationParams from "../../entities/PaginationParams";
import Enrollment from "../entities/enrollements";

const DEFAULT_PAGINATION: PaginationParams = {
    page: 1,
    pageSize: 10,
    seed: ''
};

const useEnrollments = (params: Partial<PaginationParams> = {}) => {
    const queryParams: PaginationParams = {
        ...DEFAULT_PAGINATION,
        ...params
    };

    return useQuery<PaginationResponse<Enrollment>, AxiosError>({
        queryKey: [...ENROLL_CACHE_KEY, queryParams],
        queryFn: () => enrollmentFetchService.get("", queryParams),
        staleTime: DAY
    });
};

export default useEnrollments;