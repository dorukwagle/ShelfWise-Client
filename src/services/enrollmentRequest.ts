import Enrollment from "../entities/enrollements";
import APIClient from "./apiClient";

const enrollmentService = new APIClient<Enrollment, any>("/enrollments/enroll");

export default enrollmentService;
