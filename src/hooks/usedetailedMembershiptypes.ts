import { useQuery } from "@tanstack/react-query";
import { DAY, DETAILED_MEMBER_TYPE_KEY } from "../entities/constants";
import membershipTypeService from "../services/membershipTypeService";
import MembershipTypes from "../entities/MembershipTypes";

const useDetailedMembershipTypes = () => {
  return useQuery<MembershipTypes[]>({
    queryKey: DETAILED_MEMBER_TYPE_KEY,
    queryFn: () => membershipTypeService<MembershipTypes[]>().get(),
    staleTime: DAY,
  });
};

export default useDetailedMembershipTypes;
