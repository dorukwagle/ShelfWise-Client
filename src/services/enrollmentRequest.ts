import User from "../entities/User";
import APIClient from "./apiClient";

const enrollmentService = new APIClient<User, any>("/enrollments/enroll");

export default enrollmentService;
