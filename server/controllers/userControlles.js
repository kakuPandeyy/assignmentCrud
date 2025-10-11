import { use } from 'react';
import User from '../models/userModels.js';

export const getUser = async (req, res) => {
  try {
    console.log('hello world');
    const { id } = req.params;
    const user = await User.findById(id); //  find all posts

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
export default getUser;
