import { useQuery } from "@tanstack/react-query";
import { DAY, USER_ROLES_KEY } from "../../entities/constants";
import membershipTypeService from "../services/membershipTypeService";
import MembershipTypes from "../entities/MembershipTypes";

const useMembershipType = () => {
  return useQuery<MembershipTypes>({
    queryKey: USER_ROLES_KEY,
    queryFn: () => membershipTypeService<MembershipTypes>().get(),
    staleTime: DAY,
  });
};

export default useMembershipType;