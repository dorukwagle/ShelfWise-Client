import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { postPenalties } from "../services/paymentService";
import { PAYMENT_CACHE_KEY, NOTIFICATION_COUNT_CACHE_KEY, NOTIFICATION_CACHE_KEY } from "../../entities/constants";
import { ErrorRes } from "../../entities/ErrorRes";
import { AddPenalty } from "../entities/payments";

const useMakePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<any, AxiosError<ErrorRes>, { userId: string; body: AddPenalty }>({
    mutationFn: ({ userId, body }) => postPenalties.setSubroute(`${userId}`).post(body),
    onSuccess: () => {
      // Invalidate payment cache
      queryClient.invalidateQueries({ queryKey: PAYMENT_CACHE_KEY });
      
      // Invalidate notification cache
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_COUNT_CACHE_KEY });

      //Invalidae notification cache
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_CACHE_KEY });
    },
  });
};
    
export default useMakePayment;