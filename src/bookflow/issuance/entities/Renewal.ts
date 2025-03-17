import User from "../../../entities/User";
import { Issue } from "./Issues";

export enum ERenewalStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected",
}

export interface Renewal {
    renewalId: string;
    issueId: string;
    issue: Issue;
    userId: string;
    user: User;
    bookTitle: string;
    status: ERenewalStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null;
}