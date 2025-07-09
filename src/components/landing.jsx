import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-gray-800 px-4">
      <div className="text-center bg-white bg-opacity-70 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-gray-200 max-w-2xl w-full">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-8 text-sky-500">
          ADFLUENCE
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Connect, Share & Grow with{' '}
          <span className="text-sky-500">MySocial</span>
        </h2>
        <p className="text-base md:text-lg mb-8 text-gray-700">
          The ultimate platform to meet new friends, share your thoughts, and join vibrant communities.
        </p>
        <Link
          to="/login"
          className="bg-sky-400 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-sky-300 hover:scale-105 transition-all duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;
