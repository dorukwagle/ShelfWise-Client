import UserRoles from "../entities/UserRoles";
import APIClient from "./apiClient";

const roleService = new APIClient<UserRoles[]>("/roles");
export default roleService;