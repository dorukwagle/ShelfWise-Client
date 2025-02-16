import Book from "../entities/Book";
import APIClient from "./apiClient";

const bookService = new APIClient<any, any>("/books");

export default bookService;
