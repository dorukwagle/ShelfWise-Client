import APIClient from "./apiClient";
import GlobalAttribute from "../entities/GlobalAttribute";

const globalAttributeService = new APIClient<GlobalAttribute, GlobalAttribute>("/attributes/global");
export default globalAttributeService;
