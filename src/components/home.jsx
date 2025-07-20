import React, { useState, useEffect } from 'react';

const Home = () => {
  const [likedPhotos, setLikedPhotos] = useState({});
  const [topic, setTopic] = useState('all');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Chatbot related states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const PEXELS_API_KEY = 'u7Ks6f46u39aTV7Z3LYl0HoyRnQIEcIzoR6V8ErfxHzPgcvJnl4qruAv';

  const uploadedImages = [
    {
      id: 'cloudinary-1',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/6_photo_sivwr9.avif',
      description: 'Tranquil forest landscape – perfect escape into nature.',
      category: 'nature',
      featured: true,
    },
    {
      id: 'cloudinary-2',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/2photo_e2btzj.jpg',
      description: 'Historic streets with local charm – explore the world.',
      category: 'travel',
      featured: true,
    },
    {
      id: 'cloudinary-3',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/4photo_pfwryf.jpg',
      description: 'Athletes in action – the thrill of sports captured.',
      category: 'sports',
      featured: true,
    },
    {
      id: 'cloudinary-4',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/3_photo_igqaeu.jpg',
      description: 'Early morning mist in a peaceful natural setting.',
      category: 'nature',
      featured: true,
    },
    {
      id: 'cloudinary-5',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784792/1photo_qz11ft.jpg',
      description: 'Golden hour by the sea – a perfect travel memory.',
      category: 'travel',
      featured: true,
    },
    {
      id: 'cloudinary-6',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784771/great-wall-of-china-most-visited-tourist-attraction_ipwq9f.png',
      description: 'The Great Wall of China – history carved in stone.',
      category: 'travel',
      featured: true,
    },
    {
      id: 'cloudinary-7',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784770/Most_Popular_Sports_By_Country_ij4rtp.webp',
      description: 'A world united by sports – most popular games globally.',
      category: 'sports',
      featured: true,
    },
    {
      id: 'cloudinary-8',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784766/pexels-photo-2834917_nizxdy.jpg',
      description: 'Lush greenery beside calm waters – pure natural beauty.',
      category: 'nature',
      featured: true,
    },
    {
      id: 'cloudinary-9',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/INDONESIA_tliqyn.jpg',
      description: 'Vibrant Indonesian culture – a journey of colors.',
      category: 'travel',
      featured: true,
    },
    {
      id: 'cloudinary-10',
      author: 'Cloudinary',
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/p_wtiakh.webp',
      description: 'Excitement of the game – sports spirit in motion.',
      category: 'sports',
      featured: true,
    },
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
            headers: { Authorization: PEXELS_API_KEY },
          }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const formatted = data.photos.map((photo) => ({
          id: `pexels-${photo.id}`,
          author: photo.photographer,
          image: photo.src.landscape,
          description: `${photo.alt || 'Beautiful photo'} – ${query}`,
          category: query,
          featured: false,
        }));

        pexelsPhotos.push(...formatted);
      }

      const combined = [...uploadedImages, ...pexelsPhotos];

      const uniquePhotos = combined.filter(
        (photo, index, self) => index === self.findIndex((p) => p.id === photo.id)
      );

      setPhotos(uniquePhotos);

      const initialLikes = {};
      uniquePhotos.forEach((photo) => {
        initialLikes[photo.id] = {
          liked: false,
          count: Math.floor(Math.random() * 500) + 20,
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

  const filteredPhotos =
    topic === 'all'
      ? photos
      : photos.filter(
          (photo) =>
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
        },
      };
    });
  };

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    fetchPhotos(newTopic === 'all' ? '' : newTopic);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleCommentSubmit = (e, photoId) => {
    e.preventDefault();
    if (!newComment[photoId]) return;

    setComments((prev) => ({
      ...prev,
      [photoId]: [...(prev[photoId] || []), newComment[photoId]],
    }));

    setNewComment((prev) => ({
      ...prev,
      [photoId]: '',
    }));
  };

  // Chatbot helper function simulating AI response (replace with real API if you want)
  const sendMessageToAI = async (message) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`AI Response to: "${message}"`);
      }, 1500);
    });
  };

  // Chatbot submit handler
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    setChatMessages((prev) => [...prev, { from: 'user', text: chatInput }]);
    setChatInput('');
    setIsChatLoading(true);

    // Get AI response
    const aiResponse = await sendMessageToAI(chatInput);
    setChatMessages((prev) => [...prev, { from: 'ai', text: aiResponse }]);
    setIsChatLoading(false);
  };

  const NavItem = ({ href, children, isActive = false, className = '' }) => (
    <a
      href={href}
      className={`transition-colors duration-300 hover:text-sky-500 ${
        isActive ? 'text-sky-500 font-semibold' : isDarkMode ? 'text-gray-300' : 'text-gray-700'
      } ${className}`}
    >
      {children}
    </a>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-blue-50'
      }`}
    >
      <nav
        className={`fixed w-full top-0 left-0 z-50 shadow-sm flex justify-between items-center px-6 py-4 border-b transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
      >
        <h1 className="text-xl md:text-2xl font-bold text-sky-500">Adfluence</h1>
        <div className="flex items-center space-x-4 text-sm md:text-base">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-all duration-300 ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <NavItem href="/home" isActive>
            Home
          </NavItem>
          <NavItem href="/messages">Messages</NavItem>
          <NavItem href="/profile">Profile</NavItem>
          <NavItem
            href="/help"
            className={`px-3 py-1 rounded-md ${
              isDarkMode ? 'bg-sky-900 hover:bg-sky-800 text-sky-300' : 'bg-sky-100 hover:bg-sky-200 text-sky-600'
            }`}
          >
            Help
          </NavItem>
          <NavItem
            href="/login"
            className={`px-3 py-1 rounded-md ${
              isDarkMode ? 'bg-red-900 hover:bg-red-800 text-red-300' : 'bg-red-100 hover:bg-red-200 text-red-600'
            }`}
          >
            Logout
          </NavItem>
        </div>
      </nav>

      <header
        className={`text-white py-12 text-center mt-16 transition-colors duration-300 ${
          isDarkMode ? 'bg-sky-600' : 'bg-sky-500'
        }`}
      >
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
                className={`px-4 py-1 rounded-full text-sm font-medium border transition-all duration-300 ${
                  topic === value
                    ? 'bg-sky-500 text-white border-sky-500'
                    : `hover:bg-sky-100 ${
                        isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700' : 'bg-white text-gray-700 border-gray-300'
                      }`
                }`}
              >
                {label}
              </button>
            );
          })}
          <button
            onClick={() => fetchPhotos(topic === 'all' ? '' : topic)}
            className={`px-4 py-1 rounded-full text-sm font-medium border transition-all duration-300 ${
              isDarkMode
                ? 'bg-green-900 text-green-300 border-green-700 hover:bg-green-800'
                : 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200'
            }`}
          >
            🔄 Refresh
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
            <p
              className={`mt-2 transition-colors duration-300 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              Loading amazing photos...
            </p>
          </div>
        )}

        {error && (
          <div
            className={`border rounded-lg p-4 mb-6 text-sm transition-colors duration-300 ${
              isDarkMode ? 'bg-red-900 border-red-700 text-red-300' : 'bg-red-50 border-red-200 text-red-600'
            }`}
          >
            {error}
          </div>
        )}

        <div className="flex flex-col space-y-8">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className={`rounded-xl shadow-sm overflow-hidden border transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              {photo.featured && (
                <div
                  className={`text-white px-3 py-1 text-xs font-medium transition-colors duration-300 ${
                    isDarkMode ? 'bg-sky-600' : 'bg-sky-400'
                  }`}
                >
                  ⭐ Featured
                </div>
              )}
              <img
                src={photo.image}
                alt={photo.description}
                className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  e.target.src =
                    'https://via.placeholder.com/800x600/38bdf8/ffffff?text=Image+Not+Found';
                }}
              />
              <div className="p-4">
                <h3
                  className={`text-lg font-semibold transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  {photo.author}
                </h3>
                <p
                  className={`text-sm mb-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {photo.description}
                </p>
                <button
                  onClick={() => toggleLike(photo.id)}
                  className={`flex items-center hover:text-red-600 transition-colors duration-300 text-sm ${
                    likedPhotos[photo.id]?.liked ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  ❤️{' '}
                  <span className="ml-1">
                    {likedPhotos[photo.id]?.liked ? 'Liked' : 'Like'} ·{' '}
                    {likedPhotos[photo.id]?.count || 0}
                  </span>
                </button>

                <div className="mt-4">
                  <h4
                    className={`text-sm font-medium mb-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Comments
                  </h4>
                  <div className="space-y-2 mb-2">
                    {(comments[photo.id] || []).map((comment, idx) => (
                      <p
                        key={idx}
                        className={`text-xs transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        💬 {comment}
                      </p>
                    ))}
                  </div>
                  <form onSubmit={(e) => handleCommentSubmit(e, photo.id)}>
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      value={newComment[photo.id] || ''}
                      onChange={(e) =>
                        setNewComment((prev) => ({
                          ...prev,
                          [photo.id]: e.target.value,
                        }))
                      }
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleCommentSubmit(e, photo.id);
                        }
                      }}
                      className={`w-full border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors duration-300 ${
                        isDarkMode
                          ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-400'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredPhotos.length === 0 && (
          <div
            className={`text-center py-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            No photos found for "{topic}". Try a different category!
          </div>
        )}
      </main>

      <footer
        className={`text-center py-6 text-sm border-t transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800 text-gray-400 border-gray-700' : 'bg-white text-gray-400 border-gray-200'
        }`}
      >
        © 2025 Adfluence. Connect. Inspire. Grow.
      </footer>

      {/* Chatbot icon button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        {isChatOpen && (
          <div
            className={`w-80 max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col`}
            style={{ maxHeight: '30rem' }}
          >
            <header className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-gray-200">AI Chatbot</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-600 hover:text-gray-900 dark:hover:text-gray-400 font-bold"
                aria-label="Close chat"
              >
                ✕
              </button>
            </header>
            <div className="flex-1 overflow-y-auto h-64 mb-2 flex flex-col space-y-2">
              {chatMessages.length === 0 && (
                <p className="text-gray-400 text-sm italic">Ask me anything!</p>
              )}
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-md max-w-[85%] ${
                    msg.from === 'user'
                      ? 'bg-sky-500 text-white self-end rounded-tr-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 self-start rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {isChatLoading && (
                <div className="text-gray-500 italic text-sm">AI is typing...</div>
              )}
            </div>
            <form onSubmit={handleChatSubmit} className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message"
                className="flex-1 rounded border px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                disabled={isChatLoading}
              />
              <button
                type="submit"
                disabled={isChatLoading}
                className="bg-sky-500 hover:bg-sky-600 text-white px-3 rounded text-sm disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-sky-500 hover:bg-sky-600 rounded-full p-4 shadow-lg text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Toggle chatbot"
          title={isChatOpen ? 'Close chatbot' : 'Open chatbot'}
        >
          💬
        </button>
      </div>
    </div>
  );
};

export default Home;
