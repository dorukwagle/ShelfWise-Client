import axios from 'axios';

const API_URL = '/api/enrollment';

export interface EnrollmentData {
    userId: string;
    accountStatus: string;
    startDate: Date;
    expiryDate: Date;
    membershipTypeId: string;
}

export const approveEnrollment = async (userId: string, data: EnrollmentData) => {
    const response = await axios.post(`${API_URL}/approve/${userId}`, data);
    return response.data;
};