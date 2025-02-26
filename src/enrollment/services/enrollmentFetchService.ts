import Enrollment from "../entities/enrollements";
import APIClient from "../../services/apiClient";

const enrollmentFetchService = new APIClient<Enrollment[], any>("/enrollments");

export default enrollmentFetchService;
