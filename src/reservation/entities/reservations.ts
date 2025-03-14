
import { BookInfo, Books } from "../../book/entities/BookType";
import User from "../../entities/User";

export interface Reservation {
    reservationId: string;
    userId: string;
    reservationDate: string;
    status: "Pending" | "Confirmed" | "Rejected" | "Cancelled";
    bookId: string;
    bookInfoId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    bookInfo: BookInfo;
    book: Books;
    user: User;
  }
  
  export interface ReservationsResponse {
    data: Reservation[];
    info: {
      total: number;
      lastPage: number;
      prev: number | null;
      next: number | null;
    };
  }