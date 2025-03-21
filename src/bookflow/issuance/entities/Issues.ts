import { BookInfo } from "../../../book/entities/BookType";
import User from "../../../entities/User";
import { Renewal } from "./Renewal";

export enum EIssuesType {
    Active = "Active",
    Returned = "Returned",
}

export interface Issue {
    issueId: string;
    checkInDate: Date;
    dueDate: Date;
    lastRenewedAt?: Date | null;
    renewalCount: number;
    status: EIssuesType;
    bookId: string;
    book: BookInfo;
    userId: string;
    user: User;
    issuedBy: string;
    renewals: Renewal[]
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}