import Genre from "../entities/Genre";
import User from "../entities/User";
import APIClient from "./apiClient";

 const genreService = new APIClient<User, Genre>("/attributes");

export default genreService;