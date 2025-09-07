const bcrypt = require('bcrypt');
const User = require('../Models/user');

// User registration
exports.register = async (req, res) => {
  const { name, number, email, password } = req.body;

  if (!name || name.length < 2) return res.status(400).json({ message: 'Name must be at least 2 characters' });
  if (!email || !/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ message: 'Invalid email' });
  if (!number || !/^\d{10}$/.test(number)) return res.status(400).json({ message: 'Number must be 10 digits' });
  if (!password || password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
  
  try {
    const existingUser = await User.findOne({ $or: [{ email }, { number }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Email or number already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      number,
      email,
      password: hashed
    });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
