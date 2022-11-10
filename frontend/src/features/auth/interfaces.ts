import { User } from "features/users/interfaces";

export interface Auth {
  token?: string;
  user?: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
