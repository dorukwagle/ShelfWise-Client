import APIClient from "../../services/apiClient";
import { user } from "../entities/UserManagement";

const userService = new APIClient<any, user>("/users");

export default userService;