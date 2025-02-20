interface MembershipTypes {
  type: "Employee" | "Staff" | "Faculty" | "Tutor";
  membershipTypeId: string;
  precedence: number;
}

export default MembershipTypes;