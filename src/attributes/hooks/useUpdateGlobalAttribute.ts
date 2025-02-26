import { useMutation, useQueryClient } from "@tanstack/react-query";
import GlobalAttribute from "../entities/GlobalAttribute";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { GLOBAL_ATTRIBUTES_CACHE_KEY } from "../../entities/constants";
import globalAttributeService from "../services/globalattributesServices";


const useUpdateGlobalAttribute = () => {
  const queryClient = useQueryClient();

  return useMutation<GlobalAttribute, AxiosError<ErrorRes>, GlobalAttribute>({
    mutationFn: (body: GlobalAttribute) => globalAttributeService.put(body.globalAttributeId || "", body),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: GLOBAL_ATTRIBUTES_CACHE_KEY }),
  });
}

export default useUpdateGlobalAttribute;
