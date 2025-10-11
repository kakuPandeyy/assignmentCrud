import express from 'express';
// Import controller functions for CRUD logic
import {
  getPosts,
  createPosts,
  updatePosts,
  deletePosts,
} from '../controllers/postsControlles.js';

import { allGetUser, getUser } from '../controllers/userControlles.js';
import jwt from 'jsonwebtoken';

 // Create a new router instance
 const router = express.Router();



// Middleware to verify JWT

function verifyToken(req, res, next) {

  // Extract token from "Authorization" header (expected format: "Bearer <token>")
  const token = req.headers.authorization?.split(' ')[1];
  // If no token found, reject the request
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   // Attach decoded user ID to request object for use in routes/controllers
    req.userId = decoded.id;

    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.get('/getPosts', verifyToken, getPosts);
router.get('/user/:id', verifyToken, getUser);
router.get('/alluser', verifyToken, allGetUser);
router.post('/createPost', verifyToken, createPosts);
router.put('/updatePost/:id', verifyToken, updatePosts);
router.delete('/deletePost/:id', verifyToken, deletePosts);

export default router;
