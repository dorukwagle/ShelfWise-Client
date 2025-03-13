import APIClient from "../../services/apiClient";
import UserRolesRes from "../../entities/UserRolesRes";

const roleService = new APIClient<any, UserRolesRes>("/attributes/roles/detailed");

export default roleService;
