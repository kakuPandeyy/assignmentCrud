import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    trim: true, // Automatically removes extra spaces before/after the name
  },
  // Unique email address used for login
  email: {
    type: String,
    required: true, // Email is mandatory for all users
    unique: true, // No two users can have the same email
    lowercase: true, // Converts email to lowercase before saving (helps avoid duplicates)
  },
  password: {
    type: String,
    required: true, // Password is mandatory
    select: false, // Excludes password by default when fetching user data (security)
  },
});

export default mongoose.model('User', userSchema);
