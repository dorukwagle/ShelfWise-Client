import APIClient from "./apiClient";
import Author from "../entities/author";

const authorService = new APIClient<Author, Author>("/authors");

export default authorService;
