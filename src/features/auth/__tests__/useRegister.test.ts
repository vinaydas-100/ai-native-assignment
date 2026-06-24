import { renderHook, act } from '@testing-library/react';
import { useRegister } from '../hooks/useRegister';
import { authService } from '../services/auth.service';
import { ApiError } from '../../../types/api.types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock('../services/auth.service');

const mockedAuthService = authService as jest.Mocked<typeof authService>;

describe('useRegister', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return form methods and initial state', () => {
    const { result } = renderHook(() => useRegister());

    expect(result.current.register).toBeDefined();
    expect(result.current.handleSubmit).toBeDefined();
    expect(result.current.errors).toEqual({});
    expect(result.current.formError).toBeNull();
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.onSubmit).toBeDefined();
  });

  describe('when registration is successful', () => {
    it('should call authService.register and navigate to login', async () => {
      const mockResponse = {
        success: true,
        data: {
          message: 'Registration successful',
        },
      };

      mockedAuthService.register.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useRegister());

      const formData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'securepass1',
        confirmPassword: 'securepass1',
        gender: 'Female' as const,
      };

      await act(async () => {
        await result.current.onSubmit(formData);
      });

      expect(mockedAuthService.register).toHaveBeenCalledWith(formData);
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  describe('when registration fails', () => {
    it('should set formError with the API error message', async () => {
      const apiError: ApiError = {
        success: false,
        message: 'Email already exists',
      };

      mockedAuthService.register.mockRejectedValue(apiError);

      const { result } = renderHook(() => useRegister());

      const formData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'securepass1',
        confirmPassword: 'securepass1',
        gender: 'Female' as const,
      };

      await act(async () => {
        await result.current.onSubmit(formData);
      });

      expect(result.current.formError).toBe('Email already exists');
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('should clear previous formError on new submission attempt', async () => {
      const apiError: ApiError = {
        success: false,
        message: 'Email already exists',
      };

      mockedAuthService.register.mockRejectedValueOnce(apiError);

      const mockResponse = {
        success: true,
        data: {
          message: 'Registration successful',
        },
      };

      mockedAuthService.register.mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useRegister());

      const formData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'securepass1',
        confirmPassword: 'securepass1',
        gender: 'Female' as const,
      };

      await act(async () => {
        await result.current.onSubmit(formData);
      });

      expect(result.current.formError).toBe('Email already exists');

      await act(async () => {
        await result.current.onSubmit(formData);
      });

      expect(result.current.formError).toBeNull();
    });
  });
});
