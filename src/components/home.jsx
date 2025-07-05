import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [likedPhotos, setLikedPhotos] = useState({});
  const [topic, setTopic] = useState('all');

  const photos = [
    {
      id: 1,
      author: 'Anurag Pandey',
      image: '/images/1photo.jpg',
      description: 'Scenic hill with clouds – Travel',
    },
    {
      id: 2,
      author: 'Anurag Pandey',
      image: '/images/2photo.jpg',
      description: 'River stream in the valley – Nature',
    },
    {
      id: 3,
      author: 'Anurag Pandey',
      image: '/images/3photo.jpg',
      description: 'Reflection lake in the Himalayas – Nature',
    },
    {
      id: 4,
      author: 'Anurag Pandey',
      image: '/images/4photo.jpg',
      description: 'Paragliding adventure – Sports',
    },
    {
      id: 5,
      author: 'Anurag Pandey',
      image: '/images/6photo.avif',
      description: 'Snowy town in the mountains – Travel',
    },
    {
      id: 6,
      author: 'Anurag Pandey',
      image: '/images/best-travel-photos-from-around-the-world-image-24.jpg',
      description: 'Classic travel destination – Travel',
    },
  ];

  const filteredPhotos =
    topic === 'all'
      ? photos
      : photos.filter((photo) =>
          photo.description.toLowerCase().includes(topic.toLowerCase())
        );

  const toggleLike = (id) => {
    setLikedPhotos((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-md flex justify-between items-center px-6 py-4">
        <h1 className="text-xl md:text-2xl font-bold text-indigo-600">Adfluence</h1>
        <div className="space-x-4 text-sm md:text-base">
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Messages</a>
          <a href="#" className="text-gray-700 hover:text-indigo-600 font-medium">Profile</a>
          <NavLink to="/help" className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-md transition">
            Help
          </NavLink>
          <NavLink to="/login" className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md transition">
            Logout
          </NavLink>
        </div>
      </nav>

      <header className="bg-indigo-600 text-white py-12 text-center mt-16">
        <h2 className="text-4xl font-bold mb-2">Welcome to Adfluence</h2>
        <h2>Connect Socially 😁</h2>
        <p className="text-md">Connect with creatives and influencers around the world 🌍</p>
        <p className="text-md">TRAVEL SPORTS NATURE</p>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {/* Category Buttons */}
        <div className="flex justify-center space-x-3 mb-6">
          {['All', 'Travel', 'Sports', 'Nature'].map((label) => {
            const value = label.toLowerCase();
            return (
              <button
                key={label}
                onClick={() => handleTopicChange(value)}
                className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
                  topic === value
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-100'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Photo Feed */}
        <div className="flex flex-col space-y-8">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={photo.image}
                alt={photo.description}
                className="w-full h-80 object-cover rounded-xl transition-transform duration-300 hover:scale-105 shadow-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{photo.author}</h3>
                <p className="text-sm text-gray-600 mb-3">{photo.description}</p>
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