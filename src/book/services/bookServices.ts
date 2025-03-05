import APIClient from "../../services/apiClient";

const bookService = new APIClient<any, any>("/books/info");

export default bookService;
