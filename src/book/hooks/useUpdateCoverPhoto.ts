import { useMutation, useQueryClient } from "@tanstack/react-query";
// import bookService from "../services/bookServices";
import { BOOKS_CACHE_KEY } from "../../entities/constants";
import { AxiosError } from "axios";
import { coverPhotoService } from "../services/bookService";
import { BookInfo } from "../entities/BookType";

interface UpdateCoverPhotoParams {
  infoId: string;
  data: FormData;
}

interface MutationContext {
  previousBooks: BookInfo[];
}

interface ApiResponse {
  data: BookInfo;
}

const useUpdateCoverPhoto = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse, AxiosError, UpdateCoverPhotoParams, MutationContext>({
    mutationFn: async ({ infoId, data }): Promise<ApiResponse> => {
      try {
        const file = data.get('coverPhoto') as File;
        
        // Validate file before upload
        if (!file) {
          throw new Error('No file selected');
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          throw new Error('File size must be less than 5MB');
        }

        if (!file.type.startsWith('image/')) {
          throw new Error('File must be an image');
        }

        // Log the request details for debugging
        console.log('Uploading cover photo:', {
          bookId: infoId,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size
        });

        const response = await coverPhotoService
          .setSubroute(`/${infoId}/coverphoto`)  // Changed from /info/${infoId}/coverphoto
          .put('', data, {
            headers: {
              "Content-Type": "multipart/form-data",
              "Accept": "application/json",
            }
          });
        
        // Log the response for debugging
        console.log('Upload response:', response);
        
        return response;
      } catch (error) {
        if (error instanceof AxiosError) {
          // Log the error details for debugging
          console.error('Upload error details:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
          });

          // Handle specific error cases based on status codes
          switch (error.response?.status) {
            case 400:
              throw new Error('Invalid file or no file uploaded');
            case 401:
              throw new Error('Please sign in to update cover photo');
            case 403:
              throw new Error('You do not have permission to update cover photo');
            case 404:
              throw new Error('Book not found');
            default:
              throw new Error(error.response?.data?.error || error.message);
          }
        }
        throw error;
      }
    },
    onMutate: async ({ infoId, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: BOOKS_CACHE_KEY });

      // Snapshot the previous value
      const previousBooks = queryClient.getQueryData<BookInfo[]>(BOOKS_CACHE_KEY) || [];

      // Optimistically update to the new value
      queryClient.setQueryData<BookInfo[]>(BOOKS_CACHE_KEY, (old) => {
        if (!old) return old;
        return old.map((book) => {
          if (book.bookInfoId === infoId) {
            return {
              ...book,
              coverPhoto: URL.createObjectURL(data.get('coverPhoto') as File)
            };
          }
          return book;
        });
      });

      return { previousBooks };
    },
    onError: (error, variables, context) => {
      // Revert to the previous value on error
      if (context?.previousBooks) {
        queryClient.setQueryData(BOOKS_CACHE_KEY, context.previousBooks);
      }
      throw error;
    },
    onSuccess: async (response, variables) => {
      // Update the book in the cache with the new cover photo
      queryClient.setQueryData<BookInfo[]>(BOOKS_CACHE_KEY, (old) => {
        if (!old) return old;
        return old.map((book) => {
          if (book.bookInfoId === variables.infoId) {
            return {
              ...book,
              coverPhoto: response.data.coverPhoto
            };
          }
          return book;
        });
      });

      // Invalidate and refetch to ensure we have the latest data
      await queryClient.invalidateQueries({ queryKey: BOOKS_CACHE_KEY });
      await queryClient.refetchQueries({ queryKey: BOOKS_CACHE_KEY });

      // Call the success callback
      onSuccess?.();
    }
  });
};

export default useUpdateCoverPhoto;