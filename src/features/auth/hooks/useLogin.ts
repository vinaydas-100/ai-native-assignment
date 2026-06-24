import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema, LoginFormData } from '../schemas/login.schema';
import { authService } from '../services/auth.service';
import { userActions } from '../../../store/user.store';
import { ApiError } from '../../../types/api.types';

export const useLogin = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (credentials: LoginFormData) => {
    setFormError(null);
    try {
      const response = await authService.login(credentials);
      userActions.setSession({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
      });
      navigate('/dashboard');
    } catch (error: unknown) {
      const apiError = error as ApiError;
      setFormError(apiError.message || 'An unexpected error occurred');
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    formError,
    isSubmitting,
    onSubmit,
  };
};
