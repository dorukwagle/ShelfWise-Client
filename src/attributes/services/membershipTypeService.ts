import APIClient from "../../services/apiClient";

const membershipTypeService = <T>() => new APIClient<T>("/attributes/membership_types");

export default membershipTypeService;