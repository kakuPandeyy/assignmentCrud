import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Post', PostSchema);
