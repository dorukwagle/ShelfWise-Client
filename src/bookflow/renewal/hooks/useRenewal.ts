import { useQuery } from "@tanstack/react-query";
import { DAY } from "../../../entities/constants";
import { FilterParamsType, renewalService,  } from "../services/renewalService";
import { Renewal } from "../../issuance/entities/Renewal";
import PaginationResponse from "../../../entities/PaginationResponse";


const useRenewals = (params: FilterParamsType) => {
    
    return useQuery<PaginationResponse<Renewal>>({
      queryKey: ["renewals", params],
      queryFn: () => renewalService.get('', params ),
      staleTime: DAY,
    });
  };
  
  export default useRenewals;