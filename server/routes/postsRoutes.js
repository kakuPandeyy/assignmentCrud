import express from 'express';
import { getPosts, createPosts, updatePosts, deletePosts } from '../controllers/postsControlles.js';
import { getUser } from '../controllers/userControlles.js';
import jwt from 'jsonwebtoken';

// Middleware to verify JWT

const router = express.Router();

function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  console.log(req.headers.authorization?.split(' '));
  console.log(token);
  console.log(req.userId);

  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

router.get('/getPosts', verifyToken, getPosts);
router.get('/user/:id', verifyToken, getUser);
router.post('/createPost', verifyToken, createPosts);
router.put('/updatePost/:id', verifyToken, updatePosts);
router.delete('/deletePost/:id', verifyToken, deletePosts);

export default router;
