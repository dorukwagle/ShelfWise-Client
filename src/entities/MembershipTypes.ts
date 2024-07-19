interface MembershipTypes {
  type: "Employee" | "Staff" | "Faculty" | "Tutor";
  membershipTypeId: String;
  precedence: number;
}

export default MembershipTypes;