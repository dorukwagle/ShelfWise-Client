import APIClient from "./apiClient";

const roleService = <T>() => new APIClient<T>("/roles");

export default roleService;