import apiClient from '../../../services/api-client';
import { ApiResponse } from '../../../types/api.types';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from '../../../types/auth.types';

// Dummy credential for local development (no backend required)
const DUMMY_USER = {
  email: 'demo@women-safety.com',
  password: 'demo1234',
};

export const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    // Local dev: check dummy credential before hitting API
    if (
      credentials.email === DUMMY_USER.email &&
      credentials.password === DUMMY_USER.password
    ) {
      return {
        success: true,
        data: {
          user: {
            id: 'demo-001',
            name: 'Demo User',
            email: DUMMY_USER.email,
            gender: 'Female',
          },
          token: 'dummy-jwt-token-for-local-dev',
        },
      };
    }

    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    );
    return response.data;
  },

  async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      '/auth/register',
      data
    );
    return response.data;
  },
};
