
import Enrollment from "../entities/enrollements";
import APIClient from "./apiClient";

const enrollmentFetchService = new APIClient<Enrollment[], any>("/enrollments");

export default enrollmentFetchService;
