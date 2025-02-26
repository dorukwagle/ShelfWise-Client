import APIClient from "../../services/apiClient";
import User from "../../entities/User";

const registrationService = new APIClient<User, User>("/enrollments");

export default registrationService;
