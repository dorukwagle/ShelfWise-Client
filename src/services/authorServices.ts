import Author from "../entities/Author";
import APIClient from "./apiClient";

const authorService = new APIClient<any, Author>("/attributes/authors");

export default authorService;

