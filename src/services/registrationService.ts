import APIClient from "./apiClient";
import User from "../entities/User";

const registrationService = new APIClient<User, User>("/enrollments");

export default registrationService;
