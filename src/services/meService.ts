import APIClient from "./apiClient";

interface MembershipTypes {
  type: "Employee" | "Staff" | "Faculty" | "Tutor";
  membershipTypeId: String;
  precedence: number;
}

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

interface UserRoles {
  roleId: string;
  role: "Member" | "Coordinator" | "AssistantManager" | "Manager";
  precedence: number;
}

export interface User {
  userId: string;
  fullName: string;
  dob: string;
  address: string;
  contactNo: string;
  profilePicUrl: string;
  accountCreationDate: string;
  enrollMentYear: string;
  gender: "Male" | "Female" | "Others";
  roleId: string;
  role?: UserRoles;
  membershipId: string;
  membership?: Membership;
  rollNumber: string;
  email: string;
  accountStatus: "Pending" | "Active" | "Inactive" | "Rejected" | "Suspended";
}

const meService = new APIClient<User, User>("/me");

export default meService;
