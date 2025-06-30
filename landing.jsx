import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className='text-6xl md:text-5xl font-bold mb-40'>ADFLUENCE</h1>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Connect, Share & Grow with <span className="text-yellow-300">MySocial</span>
        </h1>
        <p className="text-lg md:text-xl mb-6">
          The ultimate platform to meet new friends, share your thoughts, and join vibrant communities.
        </p>
        <Link
          to="/login"
          className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;

