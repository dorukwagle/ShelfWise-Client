import APIClient from "./apiClient";
import User from "../entities/User";

const meService = new APIClient<User, User>("/me");

export default meService;
