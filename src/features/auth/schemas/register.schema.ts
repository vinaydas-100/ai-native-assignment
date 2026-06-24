import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
  gender: z.enum(['Female', 'Male', 'Other']),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}).refine((data) => data.gender === 'Female', {
  message: 'This application is available to women only',
  path: ['gender'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
