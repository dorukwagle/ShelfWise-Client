import UserRolesRes from "../../entities/UserRolesRes";
import APIClient from "../../services/apiClient";

export const resolvePenalty = new APIClient<any, any>("/users/resolve-penalty/");

export const makePayment = new APIClient<any, any>("/users/make-payment/");

export const getPaymentHistories  = new APIClient<any, any>("/users/payment-history/");

export const getPenalties = new APIClient<any, any>("/users/penalties/");

export const postPenalties = new APIClient<any, any>("/users/penalties/");
