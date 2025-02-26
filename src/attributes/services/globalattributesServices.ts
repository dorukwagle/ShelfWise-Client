import APIClient from "../../services/apiClient";
import GlobalAttribute from "../entities/GlobalAttribute";

const globalAttributeService = new APIClient<GlobalAttribute, GlobalAttribute>("/attributes/global");
export default globalAttributeService;
