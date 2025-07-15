import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  const [likedPhotos, setLikedPhotos] = useState({});
  const [topic, setTopic] = useState('all');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const PEXELS_API_KEY = 'u7Ks6f46u39aTV7Z3LYl0HoyRnQIEcIzoR6V8ErfxHzPgcvJnl4qruAv';

  const uploadedImages = [
    {
      id: 'cloudinary-1',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/6_photo_sivwr9.avif',
      description: 'Tranquil forest landscape – perfect escape into nature.',
      category: 'nature',
      featured: true
    },
    {
      id: 'cloudinary-2',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/2photo_e2btzj.jpg',
      description: 'Historic streets with local charm – explore the world.',
      category: 'travel',
      featured: true
    },
    {
      id: 'cloudinary-3',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/4photo_pfwryf.jpg',
      description: 'Athletes in action – the thrill of sports captured.',
      category: 'sports',
      featured: true
    },
    {
      id: 'cloudinary-4',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/3_photo_igqaeu.jpg',
      description: 'Early morning mist in a peaceful natural setting.',
      category: 'nature',
      featured: true
    },
    {
      id: 'cloudinary-5',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784792/1photo_qz11ft.jpg',
      description: 'Golden hour by the sea – a perfect travel memory.',
      category: 'travel',
      featured: true
    },
    {
      id: 'cloudinary-6',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784771/great-wall-of-china-most-visited-tourist-attraction_ipwq9f.png',
      description: 'The Great Wall of China – history carved in stone.',
      category: 'travel',
      featured: true
    },
    {
      id: 'cloudinary-7',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784770/Most_Popular_Sports_By_Country_ij4rtp.webp',
      description: 'A world united by sports – most popular games globally.',
      category: 'sports',
      featured: true
    },
    {
      id: 'cloudinary-8',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784766/pexels-photo-2834917_nizxdy.jpg',
      description: 'Lush greenery beside calm waters – pure natural beauty.',
      category: 'nature',
      featured: true
    },
    {
      id: 'cloudinary-9',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/INDONESIA_tliqyn.jpg',
      description: 'Vibrant Indonesian culture – a journey of colors.',
      category: 'travel',
      featured: true
    },
    {
      id: 'cloudinary-10',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/p_wtiakh.webp',
      description: 'Excitement of the game – sports spirit in motion.',
      category: 'sports',
      featured: true
    }
  ];

  const fetchPhotos = async (searchTerm = '') => {
    try {
      setLoading(true);
      setError(null);

      const queries = searchTerm ? [searchTerm] : ['nature', 'travel', 'sports'];
      const pexelsPhotos = [];

      for (const query of queries) {
        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=6&page=1`,
          {
            headers: { Authorization: PEXELS_API_KEY }
          }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const formatted = data.photos.map(photo => ({
          id: `pexels-${photo.id}`,
          author: photo.photographer,
          image: photo.src.landscape,
          description: `${photo.alt || 'Beautiful photo'} – ${query}`,
          category: query,
          featured: false
        }));

        pexelsPhotos.push(...formatted);
      }

      const combined = [...uploadedImages, ...pexelsPhotos];

      const uniquePhotos = combined.filter(
        (photo, index, self) =>
          index === self.findIndex(p => p.id === photo.id)
      );

      setPhotos(uniquePhotos);

      const initialLikes = {};
      uniquePhotos.forEach((photo) => {
        initialLikes[photo.id] = {
          liked: false,
          count: Math.floor(Math.random() * 500) + 20
        };
      });
      setLikedPhotos(initialLikes);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setError('Could not fetch from Pexels. Showing Cloudinary only.');
      setPhotos(uploadedImages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const filteredPhotos = topic === 'all'
    ? photos
    : photos.filter(photo =>
        photo.category?.toLowerCase().includes(topic.toLowerCase()) ||
        photo.description.toLowerCase().includes(topic.toLowerCase())
      );

  const toggleLike = (id) => {
    setLikedPhotos((prev) => {
      const current = prev[id];
      return {
        ...prev,
        [id]: {
          liked: !current.liked,
          count: current.count + (current.liked ? -1 : 1),
        }
      };
    });
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    fetchPhotos(newTopic === 'all' ? '' : newTopic);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-sm flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-sky-500">Adfluence</h1>
        <div className="space-x-4 text-sm md:text-base">
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              isActive ? "text-sky-500 font-semibold" : "text-gray-700 hover:text-sky-500"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/messages" 
            className={({ isActive }) => 
              isActive ? "text-sky-500 font-semibold" : "text-gray-700 hover:text-sky-500"
            }
          >
            Messages
          </NavLink>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              isActive ? "text-sky-500 font-semibold" : "text-gray-700 hover:text-sky-500"
            }
          >
            Profile
          </NavLink>
          <NavLink 
            to="/help" 
            className="bg-sky-100 hover:bg-sky-200 text-sky-600 px-3 py-1 rounded-md transition"
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

      <header className="bg-sky-500 text-white py-12 text-center mt-16">
        <h2 className="text-4xl font-bold mb-2">Welcome to Adfluence</h2>
        <p className="text-md">Explore curated and live photos of travel, sports, and nature 🌍</p>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-center space-x-3 mb-6 flex-wrap">
          {['All', 'Travel', 'Sports', 'Nature'].map((label) => {
            const value = label.toLowerCase();
            return (
              <button
                key={label}
                onClick={() => handleTopicChange(value)}
                className={`px-4 py-1 rounded-full text-sm font-medium border transition ${
                  topic === value
                    ? 'bg-sky-500 text-white'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-sky-100'
                }`}
              >
                {label}
              </button>
            );
          })}
          <button
            onClick={() => fetchPhotos(topic === 'all' ? '' : topic)}
            className="px-4 py-1 rounded-full text-sm font-medium border bg-green-100 text-green-700 border-green-300 hover:bg-green-200 transition"
          >
            🔄 Refresh
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading amazing photos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-8">
          {filteredPhotos.map((photo) => (
            <div key={photo.id} className="bg-white rounded-xl shadow-sm overflow-hidden border">
              {photo.featured && (
                <div className="bg-sky-400 text-white px-3 py-1 text-xs font-medium">⭐ Featured</div>
              )}
              <img
                src={photo.image}
                alt={photo.description}
                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600/38bdf8/ffffff?text=Image+Not+Found';
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{photo.author}</h3>
                <p className="text-sm text-gray-600 mb-3">{photo.description}</p>
                <button
                  onClick={() => toggleLike(photo.id)}
                  className={`flex items-center ${
                    likedPhotos[photo.id]?.liked ? 'text-red-500' : 'text-gray-400'
                  } hover:text-red-600 transition text-sm`}
                >
                  ❤️ <span className="ml-1">
                    {likedPhotos[photo.id]?.liked ? 'Liked' : 'Like'} · {likedPhotos[photo.id]?.count || 0}
                  </span>
                </button>

                {/* Comment Section */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-1">Comments</h4>
                  <div className="space-y-2 mb-2">
                    {(comments[photo.id] || []).map((comment, idx) => (
                      <p key={idx} className="text-xs text-gray-600">💬 {comment}</p>
                    ))}
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newComment[photo.id]) return;

                      setComments((prev) => ({
                        ...prev,
                        [photo.id]: [...(prev[photo.id] || []), newComment[photo.id]]
                      }));

                      setNewComment((prev) => ({
                        ...prev,
                        [photo.id]: ''
                      }));
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[photo.id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [photo.id]: e.target.value
                        }))
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredPhotos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No photos found for "{topic}". Try a different category!
          </div>
        )}
      </main>

      <footer className="bg-white text-center py-6 text-gray-400 text-sm border-t">
        © 2025 Adfluence. Connect. Inspire. Grow.
      </footer>
    </div>
  );
};

export default Home;