// App.jsx
import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
// import { useAuth } from './hooks/useAuth';

const App = () => {
  const [currentPage, setCurrentPage] = useState('welcome');
  // const { isAuthenticated, login } = useAuth();

  // Page navigation handlers
  const navigateToAuth = () => setCurrentPage('auth');
  const navigateToHome = () => {
    // login();
    setCurrentPage('home');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentPage === 'welcome' && (
        <WelcomePage onGetStarted={navigateToAuth} />
      )}

      {currentPage === 'auth' && (
        <AuthPage onLogin={navigateToHome} />
      )}

      {currentPage === 'home' && (
        <HomePage />
      )}
    </div>
  );
};

export default App;
