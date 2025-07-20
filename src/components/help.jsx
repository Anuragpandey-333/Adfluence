import React from 'react';

const Help = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Your response has been recorded!');
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="text-center text-3xl font-bold text-indigo-700 mb-10">
        <h1>Contact Us</h1>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">Send Us a Message</h3>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Write your message"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-md transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Help;
