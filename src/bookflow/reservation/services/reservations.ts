import APIClient from "../../../services/apiClient";
import { BookReservation } from "../entities/BookReservation";

const reservationService = new APIClient<any, any>("/bookflow/reservations/");

export default reservationService;


export const assignReservationService = new APIClient<any, any>("/bookflow/reservations/assign/");

export const assignableBooksService = new APIClient<any, any>("/bookflow/reservations/get-assignables");

export const reserveBook = async (bookInfoId: string) => {
    const api = new APIClient<any, BookReservation>(`/bookflow/reservations/${bookInfoId}`);
    const data = await api.post();
    return data;
  };
  