import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { makePayment} from "../services/paymentService";
import { PAYMENT_CACHE_KEY, NOTIFICATION_COUNT_CACHE_KEY, NOTIFICATION_CACHE_KEY, USERS_CACHE_KEY } from "../../entities/constants";
import { ErrorRes } from "../../entities/ErrorRes";
import { MakePayment } from "../entities/payments";

const useMakePayment = () => {
  const queryClient = useQueryClient();
  
  return useMutation<any, AxiosError<ErrorRes>, { userId: string; body: MakePayment }>({
    mutationFn: ({ userId, body }) => makePayment.setSubroute(`${userId}`).post(body),
    onSuccess: () => {
      // Invalidate payment cache
      queryClient.invalidateQueries({ queryKey: PAYMENT_CACHE_KEY });
      
      // Invalidate notification cache
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_COUNT_CACHE_KEY });

      //Invalidae notification cache
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_CACHE_KEY });

      //Invalidae user cache
      queryClient.invalidateQueries({ queryKey: USERS_CACHE_KEY });

    },
  });
};
    
export default useMakePayment;