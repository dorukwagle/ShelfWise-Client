import Enrollment from "../entities/enrollements";
import APIClient from "../../services/apiClient";

const enrollmentFetchService = new APIClient<any, Enrollment>("/enrollments");

export default enrollmentFetchService;
