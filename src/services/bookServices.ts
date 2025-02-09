import axios from "axios";
import { Book, Genre, Author, Publisher } from "../entities/bookTypes";
import { BASE_URL } from "../entities/constants";

/**BOOK API SERVICES*/
export const postBook = async (bookData: Book) => {
  try {
    const response = await axios.post(`${BASE_URL}/books`, bookData);
    return response.data; // Returns Book type directly
  } catch (error) {
    console.error("Error posting book:", error);
    return null;
  }
};

/**GENRE API SERVICES*/
export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genres`);
    return response.data as Genre[]; // Returns array directly
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
  }
};

/**AUTHOR API SERVICES*/
export const fetchAuthors = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/authors`);
    return response.data as Author[];
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
};

/**PUBLISHER API SERVICES*/
export const fetchPublishers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/publishers`);
    return response.data as Publisher[];
  } catch (error) {
    console.error("Error fetching publishers:", error);
    return [];
  }
};
