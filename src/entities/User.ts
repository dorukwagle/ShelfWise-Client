import  UserRoles from "./UserRoles";
import Membership  from "./Membership";

interface User {
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

export default User;