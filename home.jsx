import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [likedPhotos, setLikedPhotos] = useState({});
  const [topic, setTopic] = useState('all');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const PEXELS_API_KEY = 'u7Ks6f46u39aTV7Z3LYl0HoyRnQIEcIzoR6V8ErfxHzPgcvJnl4qruAv';

  const uploadedImages = [
    {
      id: 'cloudinary-1',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/6_photo_sivwr9.avif',
      description: 'Cloudinary uploaded image #1',
      category: 'nature',
      featured: true
    },
    {
      id: 'cloudinary-2',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/2photo_e2btzj.jpg',
      description: 'Cloudinary uploaded image #2',
      category: 'travel',
      featured: true
    },
    {
      id: 'cloudinary-3',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/4photo_pfwryf.jpg',
      description: 'Cloudinary uploaded image #3',
      category: 'sports',
      featured: true
    },
    {
      id: 'cloudinary-4',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/3_photo_igqaeu.jpg',
      description: 'Cloudinary uploaded image #4',
      category: 'nature',
      featured: true
    },
    {
      id: 'cloudinary-5',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784792/1photo_qz11ft.jpg',
      description: 'Cloudinary uploaded image #5',
      category: 'travel',
      featured: true
    },
    {
      id: 'cloudinary-6',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784771/great-wall-of-china-most-visited-tourist-attraction_ipwq9f.png',
      description: 'Cloudinary uploaded image #6',
      category: 'travel',
      featured: true
    },
    {
      id: 'cloudinary-7',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784770/Most_Popular_Sports_By_Country_ij4rtp.webp',
      description: 'Cloudinary uploaded image #7',
      category: 'sports',
      featured: true
    },
    {
      id: 'cloudinary-8',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784766/pexels-photo-2834917_nizxdy.jpg',
      description: 'Cloudinary uploaded image #8',
      category: 'nature',
      featured: true
    },
    {
      id: 'cloudinary-9',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/INDONESIA_tliqyn.jpg',
      description: 'Cloudinary uploaded image #9',
      category: 'travel',
      featured: true
    },
    {
      id: 'cloudinary-10',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/p_wtiakh.webp',
      description: 'Cloudinary uploaded image #10',
      category: 'sports',
      featured: true
    }
  ];

  const fetchPhotos = async (searchTerm = '') => {
    try {
      setLoading(true);
      setError(null);

      const queries = searchTerm ? [searchTerm] : ['nature', 'travel', 'sports'];
      const allPhotos = [...uploadedImages];

      for (const query of queries) {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=6&page=1`,
          {
            headers: {
              Authorization: PEXELS_API_KEY
            }
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const formattedPhotos = data.photos.map(photo => ({
          id: `pexels-${photo.id}`,
          author: photo.photographer,
          image: photo.src.landscape,
          description: `${photo.alt || 'Beautiful photo'} – ${query}`,
          category: query,
          featured: false
        }));

        allPhotos.push(...formattedPhotos);
      }

      const uniquePhotos = allPhotos.filter((photo, index, self) =>
        index === self.findIndex(p => p.id === photo.id)
      ).slice(0, 30);

      setPhotos(uniquePhotos);
    } catch (err) {
      console.error('Error fetching photos:', err);
      setError('Could not fetch from Pexels. Showing Cloudinary only.');
      setPhotos(uploadedImages);
    } finally {
      setLoading(false);
    }
  };

  // FIXED useEffect: run once on mount only
  useEffect(() => {
    const loadPhotos = async () => {
      await fetchPhotos();
    };

    loadPhotos();
  }, []);

  const filteredPhotos = topic === 'all'
    ? photos
    : photos.filter(photo =>
        photo.category?.toLowerCase().includes(topic.toLowerCase()) ||
        photo.description.toLowerCase().includes(topic.toLowerCase())
      );

  const toggleLike = (id) => {
    setLikedPhotos(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    if (newTopic !== 'all') {
      fetchPhotos(newTopic);
    } else {
      fetchPhotos('');
    }
  };

  const refreshPhotos = () => {
    fetchPhotos(topic === 'all' ? '' : topic);
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
        <p className="text-md">Explore curated and live photos of travel, sports, and nature 🌍</p>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
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
          <button
            onClick={refreshPhotos}
            className="px-4 py-1 rounded-full text-sm font-medium border bg-green-100 text-green-700 border-green-300 hover:bg-green-200 transition"
          >
            🔄 Refresh
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading amazing photos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="flex flex-col space-y-8">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {photo.featured && (
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 text-xs font-medium">
                  ⭐ Featured
                </div>
              )}
              <img
                src={photo.image}
                alt={photo.description}
                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600/4f46e5/ffffff?text=Image+Not+Found';
                }}
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold">{photo.author}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{photo.description}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => toggleLike(photo.id)}
                    className={`flex items-center ${
                      likedPhotos[photo.id] ? 'text-red-500' : 'text-gray-500'
                    } hover:text-red-600 transition`}
                  >
                    ❤️ <span className="ml-1">
                      {likedPhotos[photo.id] ? 'Liked' : 'Like'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">No photos found for "{topic}". Try a different category!</p>
          </div>
        )}
      </main>

      <footer className="bg-white text-center py-6 text-gray-400 text-sm">
        © 2025 Adfluence. Connect. Inspire. Grow.
      </footer>
    </div>
  );
};

export default Home;
