import APIClient from "../../services/apiClient";

const notificationService = new APIClient<any, any>("/notifications");

export default notificationService;

export const notificationCountService = new APIClient<any,any>("/notifications/count");

