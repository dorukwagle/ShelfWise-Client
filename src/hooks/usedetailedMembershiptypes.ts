import { useQuery } from "@tanstack/react-query";
import { DAY, DETAILED_MEMBER_TYPE_KEY } from "../entities/constants";
import membershipTypeService from "../attributes/services/membershipTypeService";
import MembershipTypes from "../attributes/entities/MembershipTypes";

const useDetailedMembershipTypes = () => {
  return useQuery<MembershipTypes[]>({
    queryKey: DETAILED_MEMBER_TYPE_KEY,
    queryFn: () => membershipTypeService<MembershipTypes[]>().get(),
    staleTime: DAY,
  });
};

export default useDetailedMembershipTypes;
