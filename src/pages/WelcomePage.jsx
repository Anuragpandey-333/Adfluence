import React from 'react';
import Button from '../components/common/Button';

const WelcomePage = ({ onGetStarted }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-5xl font-bold mb-6">Welcome to Adfluance</h1>
        <p className="text-xl mb-8">Your ultimate platform for advertising influence</p>
        <Button 
          onClick={onGetStarted}
          className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Let's Go
        </Button>
      </div>
    </div>
  );
};

export default WelcomePage;