
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Notification, NotificationResponse } from "../../entities/notifications";
import { DAY, NOTIFICATION_CACHE_KEY } from "../../entities/constants";
import notificationService from "../services/notifications";


const fetchNotifications = () => {
    return useQuery<NotificationResponse, AxiosError>({
        queryKey: NOTIFICATION_CACHE_KEY,
        queryFn: () => notificationService.get(),
        staleTime: DAY,
    })
    
}
export default fetchNotifications