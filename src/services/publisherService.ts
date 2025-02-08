import APIClient from "./apiClient";
import User from "../entities/User";
import Publisher from "../entities/Publisher";

const publisherService = new APIClient<User, Publisher>("/attributes");

export default publisherService;
