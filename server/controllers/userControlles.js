import { use } from 'react';
import User from '../models/userModels.js';



export const getUser = async (req, res) => {
  try {
    // Extract the user ID from request parameters
    const { id } = req.params;

    // Find the user by ID in the database
    const user = await User.findById(id);

    // Send the user object as a JSON response
    res.status(200).json(user);
  } catch (error) {
    // Log the error in the server console for debugging
    console.error(error);

    // Send a generic server error response
    res.status(500).json({ message: 'Server error' });
  }
};

export const allGetUser = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Send the list of users as a JSON response
    res.status(200).json(users);
  } catch (error) {
    // Log the error in the server console for debugging
    console.log(error);

    // Send a generic server error response
    res.status(500).json({ message: 'Server error' });
  }
};