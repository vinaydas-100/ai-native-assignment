import React from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Alert from '../../../components/ui/Alert';

const LoginForm: React.FC = () => {
  const { register, handleSubmit, errors, formError, isSubmitting, onSubmit } =
    useLogin();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label="Login form"
      noValidate
      className="w-full max-w-md mx-auto space-y-4"
    >
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Welcome Back
      </h2>

      {formError && <Alert variant="error" message={formError} />}

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

      <Button
        type="submit"
        variant="primary"
        size="md"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        ariaLabel="Login"
      >
        Login
      </Button>

      <p className="text-sm text-center text-gray-600">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
