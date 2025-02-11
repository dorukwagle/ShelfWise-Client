import APIClient from "./apiClient";
import Genre from "../entities/genre";

const genreService = new APIClient<Genre, Genre>("/genres");

export default genreService;
