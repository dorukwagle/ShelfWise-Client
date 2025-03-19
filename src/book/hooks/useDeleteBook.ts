import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BOOKS_CACHE_KEY } from "../../entities/constants";
import { AxiosError } from "axios";
import { bookDeleteService } from "../services/bookService";

const useDeleteBook = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: async (bookInfoId: string) => {
      try {
        console.log('Starting book deletion...');
        console.log('Book ID:', bookInfoId);

        // Use the correct endpoint for deleting whole book
        const response = await bookDeleteService
          .setSubroute(`/whole/${bookInfoId}`)
          .delete();
        
        console.log('Delete response:', response);
        return response;
      } catch (error) {
        console.error('Error in delete mutation:', error);
        if (error instanceof AxiosError) {
          console.error('Axios error details:', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            message: error.message,
            config: {
              url: error.config?.url,
              method: error.config?.method,
              headers: error.config?.headers
            }
          });
          
          // Get the error message from the response
          const errorMessage = error.response?.data?.message || error.message;
          console.error('Error message:', errorMessage);
          throw new Error(errorMessage);
        }
        throw error;
      }
    },
    onSuccess: async (data) => {
      console.log('Book deleted successfully:', data);
      
      // Invalidate and refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: BOOKS_CACHE_KEY });
      await queryClient.refetchQueries({ queryKey: BOOKS_CACHE_KEY });

      // Call the success callback
      onSuccess?.();
    },
    onError: (error) => {
      console.error('Error deleting book:', error);
      if (error instanceof AxiosError) {
        console.error('Axios error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
          config: {
            url: error.config?.url,
            method: error.config?.method,
            headers: error.config?.headers
          }
        });
      }
      throw error;
    }
  });
};

export default useDeleteBook; 