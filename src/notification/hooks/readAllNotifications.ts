import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { NOTIFICATION_CACHE_KEY } from "../../entities/constants";
import { NOTIFICATION_COUNT_CACHE_KEY } from "../../entities/constants";
import notificationService from "../services/notifications";

const useReadAllNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorRes>, { timestamp: string}>({
    mutationFn: ({ timestamp }) => {
      return notificationService.put(`readall/${timestamp}`);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: NOTIFICATION_COUNT_CACHE_KEY });
        queryClient.invalidateQueries({ queryKey: NOTIFICATION_CACHE_KEY });
    },
  });
};

export default useReadAllNotification;