import apiClient from '../../../services/api-client';
import { authService } from '../services/auth.service';
import { LoginRequest, RegisterRequest } from '../../../types/auth.types';

jest.mock('../../../services/api-client');

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const credentials: LoginRequest = {
      email: 'user@example.com',
      password: 'password123',
    };

    it('should send POST request to /auth/login with credentials', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            user: {
              id: '1',
              name: 'Test User',
              email: 'user@example.com',
              gender: 'Female' as const,
            },
            token: 'jwt-token-123',
          },
        },
      };

      mockedApiClient.post.mockResolvedValue(mockResponse);

      const result = await authService.login(credentials);

      expect(mockedApiClient.post).toHaveBeenCalledWith('/auth/login', credentials);
      expect(result).toEqual(mockResponse.data);
    });

    it('should propagate errors thrown by the API client', async () => {
      const apiError = {
        success: false,
        message: 'Invalid email or password',
      };

      mockedApiClient.post.mockRejectedValue(apiError);

      await expect(authService.login(credentials)).rejects.toEqual(apiError);
    });
  });

  describe('register', () => {
    const registerData: RegisterRequest = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'securepass1',
      confirmPassword: 'securepass1',
      gender: 'Female',
    };

    it('should send POST request to /auth/register with registration data', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            message: 'Registration successful',
          },
        },
      };

      mockedApiClient.post.mockResolvedValue(mockResponse);

      const result = await authService.register(registerData);

      expect(mockedApiClient.post).toHaveBeenCalledWith('/auth/register', registerData);
      expect(result).toEqual(mockResponse.data);
    });

    it('should propagate errors thrown by the API client', async () => {
      const apiError = {
        success: false,
        message: 'Email already exists',
        errors: { email: ['Email already exists'] },
      };

      mockedApiClient.post.mockRejectedValue(apiError);

      await expect(authService.register(registerData)).rejects.toEqual(apiError);
    });
  });
});
