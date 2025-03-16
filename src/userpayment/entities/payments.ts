import User from "../../entities/User";

// Define for penalty types
export enum EPenaltyTypes {
    PropertyDamage = 'PropertyDamage',
    Overdue = 'Overdue'
}

// Define for payment types
export enum EPaymentTypes {
    Membership = 'Membership',
    Penalty = 'Penalty'
}

// Define the status types for a penalty
export type PenaltyStatus = "Pending" | "Completed";

// Define the request type for creating a penalty
export interface AddPenalty {
    userId?: string;
    description: string;
    amount: number;
    penaltyType: EPenaltyTypes;
}

export interface MakePayment{
    userId: string;
    amountPaid: number;
    paymentType: EPaymentTypes;
}

export interface Penalty {
    penaltyId: string;
    description: string;
    amount: number;
    status: "Pending" | "Paid" | "Cancelled";
    penaltyType: "PropertyDamage" | "Overdue" | string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    userId: string;
    user: User;
  }



