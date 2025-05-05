import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <a href="#" className="flex items-center py-5 px-2 text-gray-100">
                <span className="font-bold text-xl">AdFluance</span>
              </a>
            </div>
            
            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-5 px-3 text-gray-100 hover:text-gray-300">Home</a>
              <a href="#" className="py-5 px-3 text-gray-100 hover:text-gray-300">About</a>
              <a href="#" className="py-5 px-3 text-gray-100 hover:text-gray-300">Services</a>
              <a href="#" className="py-5 px-3 text-gray-100 hover:text-gray-300">Contact</a>
            </div>
          </div>
          
          {/* Secondary Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-300">Login</a>
            <a href="#" className="py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-md transition duration-300">Logout</a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="outline-none mobile-menu-button">
              <svg 
                className="w-6 h-6 text-gray-100 hover:text-gray-300"
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700 text-gray-200">Home</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700 text-gray-200">About</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700 text-gray-200">Services</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700 text-gray-200">Contact</a>
        <div className="py-5">
          <a href="/login" className="block py-2 px-4 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md mx-4 mb-2 text-center">Login</a>
          <a href="#" className="block py-2 px-4 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md mx-4 text-center">Logout</a>
        </div>
      </div>
    </nav>
  );
}