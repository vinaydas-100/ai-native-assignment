import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { registerSchema, RegisterFormData } from '../schemas/register.schema';
import { authService } from '../services/auth.service';
import { ApiError } from '../../../types/api.types';

export const useRegister = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setFormError(null);
    try {
      await authService.register(data);
      navigate('/login');
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
