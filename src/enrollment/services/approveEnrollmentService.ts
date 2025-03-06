import APIClient from "../../services/apiClient";

export interface EnrollmentApproveData {
    userId: string;
    fullName: string;
    dob: string | null;
    address: string;
    contactNo: string;
    enrollmentYear: string;
    gender: string;
    rollNumber: string;
    password: string;
    email: string;
    roleId: string;
    universityId: string;
    collegeId: string;
    profilePicUrl: string;
    accountCreationDate: string;
    enrollMentYear: string;
    accountStatus: string;
    startDate: Date;
    expiryDate: Date;
    membershipTypeId: string;
}

const apiClient = new APIClient<EnrollmentApproveData, any>("/enrollments/approve");

const enrollmentApproveService = async (enroll: EnrollmentApproveData) => {
    const { userId } = enroll;
    return apiClient.setSubroute(`/${userId}`).post(enroll);
};

export default enrollmentApproveService;