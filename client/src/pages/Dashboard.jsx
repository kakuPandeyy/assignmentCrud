import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import CreatePost from '../components/createPost';
import PostsCard from '../components/PostsCard';
import { getPostRouter } from '../utils/apiRoutes';
import axios from 'axios';

export default function PostsFeed() {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fecthData = () => {
    axios
      .get(getPostRouter, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setPosts(res.data))
      .catch(err => {
        console.log(err);
        navigate('/login');
      });
  };

  useEffect(() => {
    fecthData();
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      setUserId(decoded.id);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#479f6c] via-[#142c1e] to-[#] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          <div className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3"></div>
            <button
              onClick={handleLogout}
              className="backdrop-blur-lg rounded-full px-6 py-2 border border-white border-opacity-20 text-white font-semibold hover:border-opacity-40 transition-all"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Logout
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2 text-white">Social Feed</h1>
            <p className="text-cyan-100">Share your thoughts with the world</p>
          </div>
        </div>
        <div className="mb-8 text-center"></div>

        {/* Create Post Card */}

        <CreatePost setPosts={setPosts} />

        {/* Posts Feed */}

        <div className="space-y-4">
          {posts.map(post => (
            <PostsCard
              key={post._id}
              id={post._id}
              userId={userId}
              message={post.message}
              postedBy={post.postedBy}
              createdAt={post.updatedAt}
              posts={posts}
              setPosts={setPosts}
            />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16 text-purple-200">
            <p className="text-xl">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
}
