import APIClient from "./apiClient";

const roleService = <T>() => new APIClient<T>("/attributes/roles");

export default roleService;