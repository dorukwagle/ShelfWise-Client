import APIClient from "../../../services/apiClient";

const issuanceService = new APIClient<any, any>("/bookflow/issuance");

export default issuanceService;

