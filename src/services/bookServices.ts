import Book from "../entities/Book";
import APIClient from "./apiClient";

const bookService = new APIClient<any, Book>("/books/info");

export default bookService;
