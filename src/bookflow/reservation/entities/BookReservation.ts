import { BookInfo, Books } from "../../../book/entities/BookType";
import User from "../../../entities/User";

export enum EReservationStatus {
    Pending = "Pending",
    Cancelled = "Cancelled",
    Confirmed = "Confirmed",
    Resolved = "Resolved",
}


export interface BookReservation {
    reservationId: string;
    userId: string;
    reservationDate?: string;
    status: EReservationStatus;
    bookId?: string | null;
    bookInfoId: string;
    book?: Books;
    user: User;
    bookInfo: BookInfo;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}