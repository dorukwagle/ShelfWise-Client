import UserRolesRes from "../entities/UserRolesRes";
import APIClient from "./apiClient";

const roleService = new APIClient<UserRolesRes>("/roles");
export default roleService;