import { useState } from 'react';
import { Heart, MessageCircle, Send } from 'lucide-react';
import Navbar from '../components/common/Navbar';

export default function HomePage() {
  // Sample data for initial posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Jane Smith',
      avatar: '/api/placeholder/50/50',
      content: 'Just finished my latest project! So excited to share it with everyone soon.',
      image: 'data:image/jpeg;base64,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',
      timestamp: '2 hours ago',
      likes: 24,
      liked: false,
      comments: [
        { id: 101, user: 'Alex Johnson', content: 'Can\'t wait to see it!', timestamp: '1 hour ago' },
        { id: 102, user: 'Sam Wilson', content: 'Sounds amazing! Keep up the great work.', timestamp: '45 minutes ago' }
      ],
      showComments: false
    },
    {
      id: 2,
      user: 'Michael Chen',
      avatar: '/api/placeholder/50/50',
      content: 'Beautiful sunset at the beach today. Nature never fails to amaze me.',
      image: '/api/placeholder/600/400',
      timestamp: '5 hours ago',
      likes: 42,
      liked: true,
      comments: [
        { id: 201, user: 'Lisa Park', content: 'What a gorgeous view!', timestamp: '4 hours ago' },
        { id: 202, user: 'David Kim', content: 'Which beach is this?', timestamp: '3 hours ago' }
      ],
      showComments: false
    },
    {
      id: 3,
      user: 'Sarah Johnson',
      avatar: '/api/placeholder/50/50',
      content: 'Just finished reading this amazing book! Highly recommend if you\'re into science fiction.',
      timestamp: '1 day ago',
      likes: 18,
      liked: false,
      comments: [
        { id: 301, user: 'Chris Evans', content: 'What\'s the title?', timestamp: '20 hours ago' }
      ],
      showComments: false
    }
  ]);

  // Handle liking a post
  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
          liked: !post.liked
        };
      }
      return post;
    }));
  };

  // Toggle comment visibility
  const toggleComments = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          showComments: !post.showComments
        };
      }
      return post;
    }));
  };

  // Add a new comment
  const addComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: Date.now(),
          user: 'You',
          content: commentText,
          timestamp: 'Just now'
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment],
          showComments: true
        };
      }
      return post;
    }));
  };

  // Component for individual post
  const Post = ({ post }) => {
    const [commentText, setCommentText] = useState('');
    
    const handleSubmitComment = () => {
      addComment(post.id, commentText);
      setCommentText('');
    };
    
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmitComment();
      }
    };
    
    return (
      <div className="bg-white rounded-lg shadow-md mb-6 overflow-hidden">
        {/* Post header */}
        <div className="flex items-center p-4">
          <img 
            src={post.avatar} 
            alt={`${post.user}'s avatar`}
            className="w-10 h-10 rounded-full mr-3" 
          />
          <div>
            <h3 className="font-semibold">{post.user}</h3>
            <p className="text-gray-500 text-sm">{post.timestamp}</p>
          </div>
        </div>
        
        {/* Post content */}
        <div className="px-4 pb-2">
          <p className="mb-3">{post.content}</p>
        </div>
        
        {/* Post image (if available) */}
        {post.image && (
          <div className="w-full">
            <img 
              src={post.image} 
              alt="Post content" 
              className="w-full h-auto"
            />
          </div>
        )}
        
        {/* Post stats */}
        <div className="px-4 py-2 flex justify-between text-gray-500 text-sm border-t">
          <span>{post.likes} likes</span>
          <span>{post.comments.length} comments</span>
        </div>
        
        {/* Action buttons */}
        <div className="px-4 py-2 flex border-t border-b">
          <button 
            className={`flex items-center justify-center w-1/2 py-2 ${post.liked ? 'text-red-500' : 'text-gray-500'} hover:bg-gray-100`}
            onClick={() => handleLike(post.id)}
          >
            <Heart className={`mr-1 ${post.liked ? 'fill-red-500 stroke-red-500' : ''}`} size={18} />
            <span>Like</span>
          </button>
          <button 
            className="flex items-center justify-center w-1/2 py-2 text-gray-500 hover:bg-gray-100"
            onClick={() => toggleComments(post.id)}
          >
            <MessageCircle className="mr-1" size={18} />
            <span>Comment</span>
          </button>
        </div>
        
        {/* Comments section */}
        {post.showComments && (
          <div className="px-4 py-2 bg-gray-50">
            {/* Existing comments */}
            {post.comments.map(comment => (
              <div key={comment.id} className="mb-3 last:mb-2">
                <div className="flex items-start">
                  <div className="bg-gray-200 px-3 py-2 rounded-lg">
                    <span className="font-semibold text-sm">{comment.user}</span>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-1">{comment.timestamp}</p>
              </div>
            ))}
            
            {/* Add comment input */}
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="Write a comment..."
                className="flex-grow px-3 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button 
                onClick={handleSubmitComment} 
                className="ml-2 p-2 text-blue-500"
                disabled={!commentText.trim()}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    
    <div className="min-h-screen bg-gray-100">
        <Navbar/>
      <div className="max-w-2xl mx-auto py-6 px-4 sm:px-6">
        <h1 className="text-2xl font-bold mb-6">Home Feed</h1>
        
        {/* Posts container */}
        <div className="space-y-6">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}