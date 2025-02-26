import Genre from "../entities/Genre";
import APIClient from "../../services/apiClient";

const genreService = new APIClient<any, Genre>("/attributes/genres");

export default genreService;





