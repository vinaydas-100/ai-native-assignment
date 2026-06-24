export type Gender = 'Female' | 'Male' | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  gender: Gender;
}

export interface UserSession {
  user: User;
  token: string;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: Gender;
}

export interface RegisterResponse {
  message: string;
}
