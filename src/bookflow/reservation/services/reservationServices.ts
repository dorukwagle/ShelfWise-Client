import APIClient from "../../../services/apiClient";
import { BookReservation } from "../entities/BookReservation";

const reservationService = new APIClient<any, BookReservation>("bookflow/reservations");

export default reservationService;

