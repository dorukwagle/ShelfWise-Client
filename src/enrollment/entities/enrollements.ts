interface Enrollment {
    userId: string;
    fullName: string;
    dob: string | null; // Allowing both string and null
    address: string;
    contactNo: string;
    enrollmentYear: string;
    gender: string;
    password: string;
    collegeId: string;
    universityId: string;
    email: string;
    roleId: string;
}

export default Enrollment;