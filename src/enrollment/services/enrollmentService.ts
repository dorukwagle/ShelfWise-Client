import Enrollment from "../entities/enrollements";
import APIClient from "../../services/apiClient";

const enrollmentService = new APIClient<Enrollment, any>("/enrollments/request");

export default enrollmentService;