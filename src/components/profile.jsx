import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Anurag Pandey',
    username: '@anuragpandey',
    email: 'anurag.pandey@example.com',
    bio: 'Nature enthusiast and travel photographer. Sharing moments that inspire wanderlust and appreciation for our beautiful world.',
    location: 'Sonipat ,Haryana',
    website: 'anurag.photo',
    joinDate: 'March 2023',
    avatar: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/6_photo_sivwr9.avif'
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });

  const stats = {
    photos: 127,
    followers: 2456,
    following: 189,
    likes: 12847
  };

  const recentPhotos = [
    {
      id: 1,
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/2photo_e2btzj.jpg',
      likes: 234
    },
    {
      id: 2,
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/4photo_pfwryf.jpg',
      likes: 187
    },
    {
      id: 3,
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784793/3_photo_igqaeu.jpg',
      likes: 312
    },
    {
      id: 4,
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784792/1photo_qz11ft.jpg',
      likes: 298
    },
    {
      id: 5,
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784766/pexels-photo-2834917_nizxdy.jpg',
      likes: 156
    },
    {
      id: 6,
      image: 'https://res.cloudinary.com/dj4xzdd0h/image/upload/v1751784765/INDONESIA_tliqyn.jpg',
      likes: 422
    }
  ];

  const handleEdit = () => {
    setIsEditing(true);
    setTempProfile({ ...profile });
  };

  const handleSave = () => {
    setProfile({ ...tempProfile });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempProfile({ ...profile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-sm flex flex-wrap justify-between items-center px-4 py-3 md:px-6 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-sky-500">Adfluence</h1>
        <div className="space-x-2 md:space-x-4 text-sm md:text-base flex flex-wrap">
          <NavLink to="/home" className="text-gray-700 hover:text-sky-500">Home</NavLink>
          <a href="#" className="text-gray-700 hover:text-sky-500">Messages</a>
          <a href="#" className="text-sky-500 font-medium">Profile</a>
          <NavLink to="/help" className="bg-sky-100 hover:bg-sky-200 text-sky-600 px-2 py-1 rounded-md transition">
            Help
          </NavLink>
          <NavLink to="/login" className="bg-red-100 hover:bg-red-200 text-red-600 px-2 py-1 rounded-md transition">
            Logout
          </NavLink>
        </div>
      </nav>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-sky-400 to-blue-500 pt-24 pb-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col-reverse md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white"></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left w-full">
                {!isEditing ? (
                  <>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">{profile.name}</h1>
                    <p className="text-sky-600 font-medium mb-2">{profile.username}</p>
                    <p className="text-gray-600 mb-3 max-w-md mx-auto md:mx-0">{profile.bio}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-500 mb-4">
                      <span>📍 {profile.location}</span>
                      <span>🌐 {profile.website}</span>
                      <span>📅 Joined {profile.joinDate}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    {['name', 'username', 'location', 'website'].map(field => (
                      <input
                        key={field}
                        type="text"
                        value={tempProfile[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      />
                    ))}
                    <textarea
                      value={tempProfile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                      rows="3"
                      placeholder="Bio"
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center md:justify-start mt-4 gap-3">
                  {!isEditing ? (
                    <>
                      <button
                        onClick={handleEdit}
                        className="w-full sm:w-auto bg-sky-500 text-white px-6 py-2 rounded-md hover:bg-sky-600 transition font-medium"
                      >
                        Edit Profile
                      </button>
                      <button className="w-full sm:w-auto bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition font-medium">
                        Share Profile
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="w-full sm:w-auto bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="w-full sm:w-auto bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-gray-800">{value.toLocaleString()}</div>
                <div className="text-sm text-gray-500 capitalize">{key}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Photos */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Recent Photos</h2>
            <button className="text-sky-500 hover:text-sky-600 font-medium">View All</button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {recentPhotos.map((photo) => (
              <div key={photo.id} className="relative group cursor-pointer">
                <img
                  src={photo.image}
                  alt={`Photo ${photo.id}`}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    ❤️ {photo.likes}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Achievements</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              ['🏆', 'Top Contributor'],
              ['📸', 'Photo Master'],
              ['🌟', 'Rising Star'],
              ['❤️', 'Most Liked']
            ].map(([emoji, label]) => (
              <div key={label} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-2">{emoji}</div>
                <div className="text-sm font-medium text-gray-700">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-center py-6 text-gray-400 text-sm border-t">
        © 2025 Adfluence. Connect. Inspire. Grow.
      </footer>
    </div>
  );
};

export default Profile;
