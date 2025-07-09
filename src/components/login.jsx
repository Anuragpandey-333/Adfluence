import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'anurag@gmail.com' && password === 'anuragpandey@123') {
      alert('Logged in successfully');
      navigate('/home');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-2xl rounded-3xl px-10 py-12 w-full max-w-md border border-white border-opacity-30">
        <h2 className="text-3xl font-bold text-center text-white mb-8 drop-shadow-md">
          Welcome Back to <span className="text-yellow-300">ADFLUENCE</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-white mb-1">Email</label>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2 focus-within:ring-2 ring-yellow-300">
              <FaEnvelope className="text-white mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                required
                className="bg-transparent outline-none w-full text-white placeholder-gray-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-white mb-1">Password</label>
            <div className="flex items-center bg-white bg-opacity-20 rounded-lg px-4 py-2 focus-within:ring-2 ring-yellow-300">
              <FaLock className="text-white mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
                required
                className="bg-transparent outline-none w-full text-white placeholder-gray-300"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-white">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-yellow-400" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline text-yellow-300">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-300 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white">
          Don't have an account?{' '}
          <a href="#" className="text-yellow-300 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

