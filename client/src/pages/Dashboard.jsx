import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import CreatePost from '../components/CreatePost';
import PostsCard from '../components/PostsCard';
import SearchBar from '../components/SearchBar';
import { getPostRouter, getAllUserRouter } from '../utils/apiRoutes';

import axios from 'axios';

export default function Dashboard() {
  const [posts, setPosts] = useState([]); // store all posts
  const [filter, setFilter] = useState([]);
  const [searchOn, setSearchOn] = useState(false);
  const [userId, setUserId] = useState(); // store current user_Id
  const [allUsers, setAllUsers] = useState([]); //all user so that we can search in all users also

  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate(); // for navigation

  // jwt token from local storage
  const token = localStorage.getItem('token');

  // get all posts from server

  const fecthData = () => {
    axios
      .get(getPostRouter, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        // Check if res.data is an array
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]); // fallback to empty array
        }
      })
      .catch(err => {
        console.log(err);
        console.log(posts);
        navigate('/login');
      });

    //get all users for search
    axios
      .get(getAllUserRouter, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => {
        // Check if res.data is an array
        if (Array.isArray(res.data)) {
          setAllUsers(res.data);
        } else {
          setAllUsers([]); // fallback to empty array
        }
      });
  };

  //get data to render

  useEffect(() => {
    //fecth on each rerender
    fecthData();



    if (token && token===undefined) {
      //  retrieving user id from jwt token
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  //search feature

  useEffect(() => {
    // Check if the search query is empty
    if (searchQuery === '') {
      // If no search query, we turn off the search mode
      setSearchOn(false);
    } else {
      // If there's a search query, we filter the posts array
      const result = posts?.filter(per => {
        // Find the corresponding user object for this post
        const userObj = allUsers.find(u => u._id === per.postedBy);
        // Get the user's name, or empty string if not found
        const userName = userObj?.name || '';

        // Return true if either the post's message includes the search query
        // or the user's name includes the search query (case-insensitive for user name)
        return (
          per.message.includes(searchQuery) ||
          userName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      // Turn on search mode
      setSearchOn(true);
      // Update the filtered results
      setFilter(result);
    }
  }, [searchQuery]);

  const handleLogout = () => {
    //remove token in order to logout
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#479f6c] via-[#142c1e] to-[#] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}

        <div className="mb-8">
          {/* div for sturcture */}
          <div className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-3"></div>
            {/* logout button */}
            <button
              onClick={handleLogout}
              className="backdrop-blur-lg cursor-pointer rounded-full px-6 py-2 border border-white border-opacity-20 text-white font-semibold hover:border-opacity-40 transition-all"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              Logout
            </button>
          </div>
          {/* heading & description */}
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-2 text-white">Social Feed</h1>
            <p className="text-cyan-100">Share your thoughts with the world</p>
          </div>
        </div>
        <div className="mb-8 text-center"></div>
        {/* Search Bar */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        {/* Create Post Card */}

        <CreatePost setPosts={setPosts} />

        {/* Posts Feed */}

        <div className="space-y-4">
          {searchOn
            ? // when filter is on the this render
              filter &&
              filter?.map(post => (
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
              ))
            : // when filter is off the this render
              posts &&
              posts?.map(post => (
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

        {/* if feed is empty*/}
        {posts.length === 0 && (
          <div className="text-center py-16 text-purple-200">
            <p className="text-xl">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
}
