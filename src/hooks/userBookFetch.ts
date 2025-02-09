import { useQuery } from "@tanstack/react-query";
import { fetchGenres, fetchAuthors, fetchPublishers } from "../services/bookServices";
import { Genre, Author, Publisher } from "../entities/bookTypes";

// Hook to fetch genres
export const useFetchGenres = () => {
  return useQuery<Genre[]>({
    queryKey: ["genres"],
    queryFn: fetchGenres,
  });
};

// Hook to fetch authors
export const useFetchAuthors = () => {
  return useQuery<Author[]>({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });
};

// Hook to fetch publishers
export const useFetchPublishers = () => {
  return useQuery<Publisher[]>({
    queryKey: ["publishers"],
    queryFn: fetchPublishers,
  });
};
