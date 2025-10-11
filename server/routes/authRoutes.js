import express from 'express';
import { register, login } from '../controllers/authControlles.js';
import jwt from 'jsonwebtoken';

// Middleware to verify JWT

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;
