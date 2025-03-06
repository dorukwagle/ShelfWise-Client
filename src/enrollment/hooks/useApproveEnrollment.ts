import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EnrollmentApproveData } from "../services/approveEnrollmentService";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { ENROLL_CACHE_KEY } from "../../entities/constants";
import enrollmentApproveService from "../services/approveEnrollmentService";

const useApproveEnrollment = () => {
    const queryClient = useQueryClient();

    return useMutation<EnrollmentApproveData, AxiosError<ErrorRes>, EnrollmentApproveData>({
        mutationFn: (body: EnrollmentApproveData) =>
            enrollmentApproveService(body),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ENROLL_CACHE_KEY }),
    })
}

export default useApproveEnrollment;