import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

const Messages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [isOnline, setIsOnline] = useState({});
  const messagesEndRef = useRef(null);

  const [contacts] = useState([
    {
      id: 1,
      name: 'Emma Wilson',
      username: '@emmawilson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey! How are you doing?',
      lastMessageTime: '2 min ago',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      username: '@marcusj',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for sharing those photos!',
      lastMessageTime: '15 min ago',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 3,
      name: 'Sophia Lee',
      username: '@sophialee',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Let’s plan the trip!',
      lastMessageTime: '1 hr ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 4,
      name: 'Daniel Kim',
      username: '@danielk',
      avatar: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Catch you later!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 5,
      name: 'Ava Patel',
      username: '@avapatel',
      avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Meeting was great!',
      lastMessageTime: '2 days ago',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 6,
      name: 'Liam Garcia',
      username: '@liamg',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Okay 👍',
      lastMessageTime: 'Just now',
      unreadCount: 0,
      isOnline: true
    }
  ]);

  useEffect(() => {
    const initialMessages = {};
    contacts.forEach(contact => {
      initialMessages[contact.id] = [
        {
          id: 1,
          senderId: contact.id,
          text: contact.lastMessage,
          timestamp: new Date(),
          isOwn: false
        }
      ];
    });
    setMessages(initialMessages);

    const onlineStatus = {};
    contacts.forEach(contact => {
      onlineStatus[contact.id] = contact.isOnline;
    });
    setIsOnline(onlineStatus);
  }, [contacts]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedContact]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    const newMsg = {
      id: Date.now(),
      senderId: 'me',
      text: newMessage.trim(),
      timestamp: new Date(),
      isOwn: true
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMsg]
    }));

    setNewMessage('');
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar */}
      <nav className="fixed w-full top-0 left-0 z-50 bg-white shadow-sm flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-xl md:text-2xl font-bold text-sky-500">Adfluence</h1>
        <div className="space-x-4 text-sm md:text-base">
          <NavLink to="/home" className={({ isActive }) => isActive ? "text-sky-500 font-medium" : "text-gray-700 hover:text-sky-500"}>Home</NavLink>
          <NavLink to="/messages" className={({ isActive }) => isActive ? "text-sky-500 font-medium" : "text-gray-700 hover:text-sky-500"}>Messages</NavLink>
          <NavLink to="/profile" className={({ isActive }) => isActive ? "text-sky-500 font-medium" : "text-gray-700 hover:text-sky-500"}>Profile</NavLink>
          <NavLink to="/help" className="bg-sky-100 hover:bg-sky-200 text-sky-600 px-3 py-1 rounded-md transition">Help</NavLink>
          <NavLink to="/login" className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-md transition">Logout</NavLink>
        </div>
      </nav>

      {/* Layout */}
      <div className="pt-20 h-screen flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Messages</h2>
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {contacts
              .filter(contact =>
                contact.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(contact => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 cursor-pointer hover:bg-sky-50 transition ${
                    selectedContact?.id === contact.id ? 'bg-sky-100' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3 relative">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {isOnline[contact.id] && (
                      <span className="absolute left-8 bottom-0 bg-green-400 w-2.5 h-2.5 rounded-full border border-white"></span>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">{contact.name}</h3>
                        <span className="text-xs text-gray-400">{contact.lastMessageTime}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500 truncate w-[80%]">{contact.lastMessage}</p>
                        {contact.unreadCount > 0 && (
                          <span className="bg-sky-500 text-white text-xs rounded-full px-2 ml-2">
                            {contact.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {selectedContact ? (
            <>
              <div className="p-4 border-b flex items-center space-x-3">
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-medium">{selectedContact.name}</h3>
                  <p className="text-xs text-gray-500">
                    {isOnline[selectedContact.id] ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-blue-50">
                {messages[selectedContact.id]?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-2 rounded-lg max-w-xs ${msg.isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100 text-black'}`}>
                      <p className="text-sm">{msg.text}</p>
                      <span className="block text-xs mt-1 opacity-75">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600 disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a contact to start chatting
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
