import APIClient from "./apiClient";
import { User } from "../entities/User";

export interface AuthRequest {
  email: string;
  password: string;
}

const authService = new APIClient<User, AuthRequest>("/auth");

export default authService;
