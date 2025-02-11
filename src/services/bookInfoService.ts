import APIClient from "./apiClient";
import BookInfo from "../entities/bookInfo";

const bookInfoService = new APIClient<BookInfo, BookInfo>("/book-info");

export default bookInfoService;
