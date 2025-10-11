import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, Heart, MessageCircle, Share2 } from 'lucide-react';
import { deletePostRouter, updatePostPostRouter, getUserRouter } from '../utils/apiRoutes';
import axios from 'axios';

export default function PostsCard({ id, message, userId, postedBy, createdAt, setPosts, posts }) {
  //store username  of post owner
  const [postUsername, setPostUsername] = useState();
  // store id of editing post
  const [editingId, setEditingId] = useState(null);
  // edited post new message
  const [editMessage, setEditMessage] = useState('');
  //geting jwt token
  const token = localStorage.getItem('token');
  // get post's owner first charater to dispaly of profile
  const characters = postUsername?.charAt(0);

  useEffect(() => {

   
    //get posts owner details like name, email
    const user = axios.get(`${getUserRouter}/${postedBy}`, {
      headers: {
        Authorization: `Bearer ${token}`, // protected route
      },
    });
    //seting posts owner name
    user.then(res => setPostUsername(res.data.name)).catch(e => console.log(e));
  }, []);

  // give time how ago post is posted
  const getTimeAgo = dateString => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };
  //  Editing
  const startEdit = (id, message) => {
    setEditingId(id);
    setEditMessage(message);
  };
  //  Delete
  const handleDelete = async id => {
    try {
      await axios.delete(`${deletePostRouter}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // optional if protected route
        },
      });
      // delete post on client side
      setPosts(posts.filter(p => p._id !== id));
    } catch (error) {
      console.log('error');
    }
  };
  //Update post
  const saveEdit = async id => {
    if (!editMessage.trim()) return;

    try {
      //update reqest for updating the post
      await axios.put(
        `${updatePostPostRouter}/${id}`,
        { message: editMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`, // protected route
          },
        }
      );
      //updating post with new message on client side
      setPosts(posts.map(p => (p._id === id ? { ...p, message: editMessage } : p)));
      //ready for another edit
      setEditingId(null);
      setEditMessage('');
    } catch (error) {
      console.log(error);
    }
  };

  //cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditMessage('');
  };

  return (
    /* post card */
    <div
      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white border-opacity-20 hover:bg-opacity-15 transition-all"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      {/* layout for post card */}
      <div className="flex items-start gap-4">
        {/* post profile post pic */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {characters}
        </div>
        {/*  post profile details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              {/* name of post owner */}
              <h3 className="text-white font-semibold"> {postUsername}</h3>
              {/* time ago of post */}
              <p className="text-purple-200 text-sm">{getTimeAgo(createdAt)}</p>
            </div>
            {/* hidding editing button  when  seleted for editing  */}
            {editingId !== id && (
              <div className="flex gap-2">
                {/* render edit and delete button only when you own post  */}
                {/* ensure that only owner can delete or update post */}
                {userId && userId === postedBy && (
                  <>
                    {/* edit */}
                    <button
                      onClick={() => startEdit(id, message)}
                      className="text-purple-200 hover:text-white transition-colors p-2"
                    >
                      <Edit2 size={18} />
                    </button>
                    {/* delete */}
                    <button
                      onClick={() => handleDelete(id)}
                      className="text-purple-200 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {editingId === id ? (
            <div>
              {/* editing text Area when seleted */}
              <textarea
                value={editMessage}
                onChange={e => setEditMessage(e.target.value)}
                className="w-full text-white placeholder-purple-300 border border-white border-opacity-20 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none mb-3"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                rows="3"
              />
              {/* update button */}
              <div className="flex gap-2">
                <button
                  onClick={() => saveEdit(id)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-90"
                >
                  Save
                </button>
                {/* cancel update */}
                <button
                  onClick={cancelEdit}
                  className="bg-white bg-opacity-10 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-opacity-20"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* normal case  show post */}
              {/* message read */}
              <p className="text-white text-lg mb-4 break-words leading-relaxed">{message}</p>

              {/* interaction button */}
              <div className="flex items-center gap-6 pt-3 border-t border-white border-opacity-10">
                <button className="flex items-center gap-2 text-purple-200 hover:text-pink-400 transition-colors">
                  <Heart size={20} className="fill-current" />
                </button>
                <button className="flex items-center gap-2 text-purple-200 hover:text-blue-400 transition-colors">
                  <MessageCircle size={20} />
                  <span className="text-sm font-semibold">Comment</span>
                </button>
                <button className="flex items-center gap-2 text-purple-200 hover:text-green-400 transition-colors">
                  <Share2 size={20} />
                  <span className="text-sm font-semibold">Share</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
