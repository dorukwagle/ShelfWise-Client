import Author from "../entities/Author";
import User from "../entities/User";
import APIClient from "./apiClient";

const authorService = new APIClient<User, Author>("/attributes");

export default authorService;