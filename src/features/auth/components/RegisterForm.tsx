import React from 'react';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Alert from '../../../components/ui/Alert';

const GENDER_OPTIONS = [
  { value: 'Female', label: 'Female' },
  { value: 'Male', label: 'Male' },
  { value: 'Other', label: 'Other' },
];

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, errors, formError, isSubmitting, onSubmit } =
    useRegister();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Registration form"
      noValidate
      className="w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Create Account
      </h2>

      {formError && <Alert variant="error" message={formError} />}

      <Input
        label="Name"
        type="text"
        placeholder="Enter your name"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <Input
        label="Gender"
        type="select"
        options={GENDER_OPTIONS}
        placeholder="Select your gender"
        error={errors.gender?.message}
        {...register('gender')}
      />

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        ariaLabel="Register"
      >
        Register
      </Button>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
