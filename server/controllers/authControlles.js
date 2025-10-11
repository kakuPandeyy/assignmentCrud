import User from '../models/userModels.js';

import brcypt from 'bcrypt';

import jwt from 'jsonwebtoken';

// register sec

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, password, email } = req.body;

    const emailcheck = await User.findOne({ email });
    if (emailcheck) {
      return res.json({ message: 'email is already exist' });
    }

    const hasedPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hasedPassword,
    });
    delete user.password;

    // 4️⃣ Create JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // 5️⃣ Return token
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
    console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(400).json({ message: 'User not found' });
    console.log(user);

    const isPasswordValid = await brcypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    delete user.password;

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // 4️⃣ Return token
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
