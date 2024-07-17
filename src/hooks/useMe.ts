import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import meService, { User } from "../services/meService";
import { HOUR } from "../entities/constants";

const useMe = () => {
    return useQuery<User, AxiosError>({
        queryKey: ["me"],
        queryFn: () => meService.get(),
        staleTime: HOUR,
    });
}

export default useMe;