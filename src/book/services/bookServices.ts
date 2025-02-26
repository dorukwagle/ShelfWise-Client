import APIClient from "../../services/apiClient";

const bookService = new APIClient<any, FormData>("/books/info");

export default bookService;
