import React, { useState } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';
import { createPostRouter } from '../utils/apiRoutes';

export default function CreatePost({ setPosts }) {
  const token = localStorage.getItem('token');

  const [newMessage, setNewMessage] = useState('');

  const handleCreate = () => {
    if (!newMessage.trim()) return;

    const newPost = {
      message: newMessage,
    };

    axios
      .post(createPostRouter, newPost, {
        headers: {
          Authorization: `Bearer ${token}`, // optional if protected route
        },
      })
      .then(res => {
        setPosts(prev => [res.data.post, ...prev]);
      })
      .catch(err => {
        console.error(' Error creating post:', err);
      });

    // setPosts([newPost, ...posts]);
    setNewMessage('');
  };

  return (
    <div
      className="backdrop-blur-lg rounded-2xl p-6 mb-6 shadow-2xl border border-white border-opacity-20"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br  from-cyan-500 to-green-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          U
        </div>
        <div className="flex-1">
          <textarea
            value={newMessage}
            onChange={e => {
              setNewMessage(e.target.value);
            }}
            placeholder="What's on your mind?"
            className="w-full text-white placeholder-purple-300 border border-white border-opacity-20 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            rows="3"
          />
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
