import APIClient from "./apiClient";

const membershipTypeService = <T>() => new APIClient<T>("/attributes/membership_types");

export default membershipTypeService;