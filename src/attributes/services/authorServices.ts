import Author from "../entities/Author";
import APIClient from "../../services/apiClient";

const authorService = new APIClient<any, Author>("/attributes/authors");

export default authorService;

