import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";
import { NOTIFICATION_CACHE_KEY, NOTIFICATION_COUNT_CACHE_KEY } from "../../entities/constants";
import notificationService from "../services/notifications";

const useReadOneNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ErrorRes>, { notificationId: string}>({
    mutationFn: ({ notificationId }) => {
    //   const data = {
    //     bookAuthors: authors
    //   };
    //   console.log(data);
      return notificationService.put(`read/${notificationId}`);
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: NOTIFICATION_COUNT_CACHE_KEY });
        queryClient.invalidateQueries({ queryKey: NOTIFICATION_CACHE_KEY });
    },
  });
};

export default useReadOneNotification;