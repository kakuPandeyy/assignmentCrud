import mongoose from 'mongoose';

// schema Post collection
const PostSchema = new mongoose.Schema(
  {
    // The main content of the post (text message)
    message: {
      type: String,
      required: true,
    },

    // Reference to the User who created the post
    postedBy: {
      type: mongoose.Schema.Types.ObjectId, // Stores the ObjectId of the User document
      ref: 'User', // References the 'User' model (must match the model name in user schema)
      required: true, // Every post must be linked to a user
    },
  },
  {
    // Automatically add `createdAt` and `updatedAt` fields to each document
    timestamps: true,
  }
);

export default mongoose.model('Post', PostSchema);
