import { useQuery } from "@tanstack/react-query";
import { DAY, PUBLISHERS_CACHE_KEY } from "../../entities/constants";
import publisherService from "../services/publisherService";
import Publisher from "../entities/Publisher";
import PaginationParams from "../../entities/PaginationParams";
import PaginationResponse from "../../entities/PaginationResponse";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";

const usePublishers = ({ seed }: PaginationParams) => {
  const params: PaginationParams = {
    page: 1,
    pageSize: 15,
    seed,
  };

  return useQuery<PaginationResponse<Publisher>, AxiosError<ErrorRes>>({
    queryKey: [...PUBLISHERS_CACHE_KEY, params],
    queryFn: () => publisherService.get("", params),
    staleTime: DAY,
  });
};

export default usePublishers;

