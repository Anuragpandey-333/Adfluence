
import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';
const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [likedPhotos, setLikedPhotos] = useState({});

  useEffect(() => {
    
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=20');
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };
    

    fetchPhotos();
  }, []);

  const toggleLike = (id) => {
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md flex justify-between items-center px-6 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-indigo-600">Adfluence</h1>
        <div className="space-x-4 text-sm md:text-base">
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Messages</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Profile</a>
          <NavLink
            to="/help"
            className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-md transition"
          >
            Help
          </NavLink>
          <NavLink
            to="/login"
            className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md transition"
          >
            Logout
          </NavLink>
        </div>
      </nav>

   
      <header className="bg-indigo-600 text-white py-12 text-center mt-16">
        <h2 className="text-4xl font-bold mb-2">Welcome to Adfluence</h2>
        <p className="text-md">Connect with creatives and influencers around the world 🌍</p>
      </header>

   
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex flex-col space-y-8">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`https://picsum.photos/id/${photo.id}/800/800`}
                alt={photo.author}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{photo.author}</h3>
                <p className="text-sm text-gray-600 mb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex space-x-4">
                  <button
                    onClick={() => toggleLike(photo.id)}
                    className={`flex items-center ${
                      likedPhotos[photo.id] ? 'text-red-500' : 'text-gray-500'
                    } hover:text-red-600`}
                  >
                    ❤️ <span className="ml-1">Like</span>
                  </button>
                  <button className="flex items-center text-blue-500 hover:text-blue-600">
                    💬 <span className="ml-1">Comment</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white text-center py-6 text-gray-400 text-sm">
        © 2025 Adfluence. Connect. Inspire. Grow.
      </footer>
    </div>
  );
};

export default Home;
