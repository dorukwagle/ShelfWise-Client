import APIClient from "../../services/apiClient";
import Publisher from "../entities/Publisher";

const publisherService = new APIClient<any, Publisher>("/attributes/publishers");

export default publisherService;

