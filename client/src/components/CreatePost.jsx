import React, { useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';
import { createPostRouter } from '../utils/apiRoutes';

export default function CreatePost({ setPosts }) {
  //jwt token
  const token = localStorage.getItem('token');
  // set new message for create new post
  const [newMessage, setNewMessage] = useState('');

  //handle create
  const handleCreate = () => {
    if (!newMessage.trim()) return;

    const newPost = {
      message: newMessage,
    };
    //post request on api/createPost to add post in database (server side)
    axios
      .post(createPostRouter, newPost, {
        headers: {
          Authorization: `Bearer ${token}`, //  protected route
        },
      })
      .then(res => {
        //updating page with new post only client side
        setPosts(prev => [res.data.post, ...prev]);
      })
      .catch(err => {
        console.error(' Error creating post:', err);
      });

    // after successfully adding in data(post ) change hook back to  empty
    setNewMessage('');
  };

  return (
    /* create post card */
    <div
      className="backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-2xl border border-white border-opacity-20"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="flex items-start gap-4">
        {/* profile pic/icon for create card */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br  from-cyan-500 to-green-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          U
        </div>
        {/* textarea for input */}
        <div className="flex-1">
          <textarea
            value={newMessage}
            onChange={e => {
              setNewMessage(e.target.value);
            }}
            placeholder="What's on your mind?"
            className="w-full text-white placeholder-cyan-100 border border-white border-opacity-20 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            rows="3"
          />
          {/* send button */}
          <div className="flex justify-end mt-3">
            <button
              onClick={handleCreate}
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-cyan-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
