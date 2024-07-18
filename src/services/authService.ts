import APIClient from "./apiClient";
import { User } from "./meService";


export interface AuthRequest {
    email: string;
    password: string;
}

const authService = new APIClient<User, AuthRequest>("/auth");

export default authService;