import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import postRouts from './routes/postsRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors()); // cross orign resource Sharing

app.use(express.json()); // automatically parse incoming JSON data from HTTP request bodies and make it available as req.body.

//connect to database by mongoose
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api', postRouts);

app.listen(5000, () => console.log('Server running on port 5000'));
