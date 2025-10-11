import User from '../models/userModels.js';

import brcypt from 'bcrypt';

import jwt from 'jsonwebtoken';

// register sec

export const register = async (req, res) => {
  try {
    //extract data from request
    const { name, password, email } = req.body;

    //search for given email
    const emailcheck = await User.findOne({ email });
    //if exist means email already exist
    if (emailcheck) {
      return res.json({ message: 'email is already exist' });
    }
    // Hash the plain-text password before saving to the database
    // bcrypt.hash(password, 10) uses 10 salt rounds — more rounds = stronger (but slower) hashing
    const hashedPassword = await brcypt.hash(password, 10);

    // Create a new user in the database with the hashed password (never store plain text!)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 4️⃣ Create JWT token with jwt secret(always in server)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

   
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: 'some technical issue try after some time' });
  }
};

// // login section
export const login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;
    //Find the user by email and explicitly include the password field (since it's select: false in the model)

    const user = await User.findOne({ email }).select('+password');
    // If no user found, return a 400 (Bad Request)
    if (!user) return res.status(400).json({ message: 'User not found' });
    //  Compare provided password with the hashed password stored in DB
    // bcrypt.compare() returns true if passwords match
    const isPasswordValid = await brcypt.compare(password, user.password);

    if (!isPasswordValid) {
      // If passwords don't match, send 401 (Unauthorized)
      return res.status(401).json({ message: 'Incorrect password' });
    }

    delete user.password;
    // Create a JWT token containing user ID and email
    // The token expires in 1 hour (configurable)
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Return token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
};
