import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import LoginForm from '../components/auth/LoginForm';
import SignUpForm from '../components/auth/SignUpForm';
import Logo from '../components/Logo';

export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSuccess = () => {
    if (isSignUp) {
      setIsSignUp(false);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Logo className="scale-150" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Inventory Management System
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg shadow-primary-100/10 sm:rounded-lg sm:px-10">
          {isSignUp ? (
            <SignUpForm onSuccess={handleSuccess} />
          ) : (
            <LoginForm onSuccess={handleSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}