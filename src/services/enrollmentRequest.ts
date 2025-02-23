import Enrollment from "../entities/enrollements";
import APIClient from "./apiClient";

const enrollmentService = new APIClient<Enrollment, any>("/enrollments/request");

export default enrollmentService;