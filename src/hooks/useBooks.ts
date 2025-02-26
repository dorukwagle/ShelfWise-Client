
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Book from "../entities/Book";
import { BOOKS_CACHE_KEY , DAY} from "../entities/constants";
import bookService from "../services/bookServices";

const fetchBooks = () => {
    return useQuery<Book, AxiosError>({
        queryKey: BOOKS_CACHE_KEY,
        queryFn: ()=> bookService.get(),
        staleTime: DAY,
    })
}
export default fetchBooks


