import Post from '../models/postModels.js';

export const getPosts = async (req, res) => {
  try {
    //  find all posts , in sequence of recent first
    const posts = await Post.find().sort({ createdAt: -1 });
    //return posts
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPosts = async (req, res) => {
  try {
    //extract message from req
    const { message } = req.body;
    //create new post object with data
    const newPost = new Post({ message: message, postedBy: req.userId });
    //save
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updatePosts = async (req, res) => {
  try {
    //extract post id from req parameters
    const { id } = req.params;
    //find post
    const post = await Post.findById(id);
    // post.postedBy(own) and req.userId from (jwt token) request id , if same mean he is owner of post and can update
    if (post.postedBy.toString() === req.userId) {
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        req.body,
        { new: true } // return the updated document
      );

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      // return updated post
      res.json(updatedPost);
    } else {
      return res.status(401).json({ message: ' only who post the video can update it you are not owner of this post' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePosts = async (req, res) => {
  try {
    //extract post id from req parameters
    const { id } = req.params;
    //find post
    const post = await Post.findById(id);
    // post.postedBy(own) and req.userId from (jwt token) request id , if same mean he is owner of post and can delete

    if (post.postedBy.toString() === req.userId) {
      const deletedPost = await Post.findByIdAndDelete(id);

      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      //send acknowlagment
      res.json({ message: 'Post deleted successfully' });
    } else {
      return res
        .status(401)
        .json({ message: ' only who post the video can delete it you are not owner of this post' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
