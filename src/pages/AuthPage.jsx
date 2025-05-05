import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { useState } from 'react';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        
        {isLogin ? (
          <LoginForm onLoginSuccess={onLogin} />
        ) : (
          <SignupForm onSignup={onLogin} />
        )}
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              className="text-blue-600 cursor-pointer hover:underline"
              onClick={toggleAuthMode}
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;