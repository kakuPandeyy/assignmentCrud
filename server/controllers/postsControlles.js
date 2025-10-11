import Post from '../models/postModels.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); //  find all posts
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPosts = async (req, res) => {
  try {
    const { message } = req.body;
    console.log(message);
    const newPost = new Post({ message: message, postedBy: req.userId });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePosts = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (post.postedBy.toString() === req.userId) {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        req.body,
        { new: true } // return the updated document
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json(updatedPost);
    } else {
      return res.status(401).json({ message: 'unAuth access' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (post.postedBy.toString() === req.userId) {
      const deletedPost = await Post.findByIdAndDelete(id);

      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      res.json({ message: 'Post deleted successfully' });
    } else {
      return res
        .status(401)
        .json({ message: 'unAuth access', postedBy: post.postedBy, userId: req.userId });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
