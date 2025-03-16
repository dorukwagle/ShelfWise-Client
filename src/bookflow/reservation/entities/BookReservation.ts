import Book from "../../../book/entities/Book";
import { BookInfo } from "../../../book/entities/BookType";
import User from "../../../entities/User";

export enum EReservationStatus {
    Pending = "Pending",
    Completed = "Completed",
    Cancelled = "Cancelled",
}


export interface BookReservation {
    reservationId: string;
    userId: string;
    reservationDate?: Date | null;
    status: EReservationStatus;
    bookId?: string | null;
    bookInfoId: string;
    book?: Book;
    user: User;
    bookInfo: BookInfo;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}