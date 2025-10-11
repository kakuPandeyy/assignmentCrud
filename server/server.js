// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import route modules
import authRoutes from './routes/authRoutes.js';
import postRouts from './routes/postsRoutes.js';
import dotenv from 'dotenv';

// Middleware setup

dotenv.config();

const app = express();

app.use(cors()); // cross orign resource Sharing

app.use(express.json()); // automatically parse incoming JSON data from HTTP request bodies and make it available as req.body.

//connect to database by mongoose
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true, // Recommended options for stable connection
    useUnifiedTopology: true, // Helps prevent deprecation warnings
  })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// API Routes
// Authentication routes (e.g., register, login)
app.use('/api/auth', authRoutes);
// Post-related routes (CRUD operations for posts)
app.use('/api', postRouts);

const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
