export interface user {
    accountCreationDate: Date;
    accountStatus: string;
    status:string;
    email: string;
    fullName: string;
    userId: string;
    role: {
      roleId: string;
      role: string;
      precedence: number;
      deletedAt: Date | null;
    };
    universityId: string;
    collegeId: string;
    createdAt: Date;
    contactNo: string;
    address: string;
    dob: Date;
    enrollmentYear: number;
    profilePicUrl: string | null;
    gender: string;
    membership: {
      membershipId: string;
      startDate: Date;
      expiryDate: Date;
      renewalCount: number;
      lastRenewalDate: Date | null;
    };
  }