interface Enrollment {
    userId: string;
    fullName: string;
    dob: string | null; // Allowing both string and null
    address: string;
    contactNo: string;
    enrollmentYear: string;
    gender: string;
    rollNumber: string;
    password: string;
    email: string;
    roleId: string;
    accountStatus: string;
    membershipTypeId: string;
    profilePicUrl: string;
    accountCreationDate: string;
    enrollMentYear: string;
    startDate: string;
    expiryDate: string;
}

export default Enrollment;