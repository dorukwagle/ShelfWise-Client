import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import GlobalAttribute from "../entities/GlobalAttribute";
import { GLOBAL_ATTRIBUTES_CACHE_KEY, DAY } from "../entities/constants";
import globalAttributeService from "../services/globalattributesServices";

const useGlobalAttributes = () => {
  return useQuery<GlobalAttribute, AxiosError>({
    queryKey: GLOBAL_ATTRIBUTES_CACHE_KEY,
    queryFn: () => globalAttributeService.get(),
    staleTime: DAY,
  });
};
export default useGlobalAttributes;
