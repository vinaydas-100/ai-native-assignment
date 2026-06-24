import { renderHook, act } from '@testing-library/react';
import { useLogin } from '../hooks/useLogin';
import { authService } from '../services/auth.service';
import { userActions } from '../../../store/user.store';
import { ApiError } from '../../../types/api.types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../services/auth.service');
jest.mock('../../../store/user.store', () => ({
  userActions: {
    setSession: jest.fn(),
  },
}));

const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('useLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return form methods and initial state', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.errors).toEqual({});
    expect(result.current.formError).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.onSubmit).toBeDefined();
  });

  describe('when login is successful', () => {
    it('should call authService.login, update store, and navigate to home', async () => {
      const mockResponse = {
        success: true,
        data: {
          user: {
            id: '1',
            name: 'Jane Doe',
            email: 'jane@example.com',
            gender: 'Female' as const,
          },
          token: 'jwt-token-123',
        },
      };

      mockedAuthService.login.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useLogin());

      await act(async () => {
        await result.current.onSubmit({ email: 'jane@example.com', password: 'password123' });
      });

      expect(mockedAuthService.login).toHaveBeenCalledWith({
        email: 'jane@example.com',
        password: 'password123',
      });
      expect(userActions.setSession).toHaveBeenCalledWith({
        user: mockResponse.data.user,
        token: mockResponse.data.token,
        isAuthenticated: true,
      });
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('when login fails', () => {
    it('should set formError with the API error message', async () => {
      const apiError: ApiError = {
        success: false,
        message: 'Invalid email or password',
      };

      mockedAuthService.login.mockRejectedValue(apiError);

      const { result } = renderHook(() => useLogin());

      await act(async () => {
        await result.current.onSubmit({ email: 'jane@example.com', password: 'wrongpass' });
      });

      expect(result.current.formError).toBe('Invalid email or password');
      expect(mockNavigate).not.toHaveBeenCalled();
      expect(userActions.setSession).not.toHaveBeenCalled();
    });

    it('should clear previous formError on new submission attempt', async () => {
      const apiError: ApiError = {
        success: false,
        message: 'Invalid email or password',
      };

      mockedAuthService.login.mockRejectedValueOnce(apiError);

      const mockResponse = {
        success: true,
        data: {
          user: {
            id: '1',
            name: 'Jane Doe',
            email: 'jane@example.com',
            gender: 'Female' as const,
          },
          token: 'jwt-token-123',
        },
      };

      mockedAuthService.login.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useLogin());

      await act(async () => {
        await result.current.onSubmit({ email: 'jane@example.com', password: 'wrongpass' });
      });

      expect(result.current.formError).toBe('Invalid email or password');

      await act(async () => {
        await result.current.onSubmit({ email: 'jane@example.com', password: 'password123' });
      });

      expect(result.current.formError).toBeNull();
    });
  });
});
