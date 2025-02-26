import MembershipTypes from "./MembershipTypes";

interface Membership {
  membershipId: String;
  startDate: String;
  expiryDate: String;
  renewalCount: number;
  lastRenewalDate: String;
  status: "Active" | "Inactive";
  membershipTypeId: String;
  type: MembershipTypes;
}

export default Membership;