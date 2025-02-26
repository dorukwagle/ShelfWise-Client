import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ENROLL_CACHE_KEY } from "../../entities/constants";
import enrollmentFetchService from "../services/enrollmentFetchService";
import Enrollment from "../entities/enrollements";

const fetchEnrollments = async ({ page, pageSize }: { page: number; pageSize: number }) => {
    const response = await enrollmentFetchService.get(`?page=${page}&pageSize=${pageSize}`);
    return response;
};

const useEnrollments = (page: number, pageSize: number) => {
    return useQuery<Enrollment[], AxiosError>({
        queryKey: [...ENROLL_CACHE_KEY, page, pageSize],
        queryFn: () => fetchEnrollments({ page, pageSize }),
    });
};

export default useEnrollments;



