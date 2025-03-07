
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DAY, NOTIFICATION_COUNT_CACHE_KEY } from "../../entities/constants";
import { notificationCountService } from "../services/notifications";


const fetchNotificationCount = () => {
    return useQuery<{ count: number }, AxiosError>({
        queryKey: NOTIFICATION_COUNT_CACHE_KEY,
        queryFn: () => notificationCountService.get(),
        staleTime: DAY,
    })
}
export default fetchNotificationCount;