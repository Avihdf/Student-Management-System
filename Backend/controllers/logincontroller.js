const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Restrict admin login through this condition
    if (user.role == 'admin') {
      res.clearCookie('admin');
      res.cookie('admin', token, {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax',
      });
      return res.status(200).json({ message: `Welcome Admin! ${user.name}`, role: user.role });
    }

    // For student login
    res.clearCookie('student');
    res.cookie('student', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
    });
    res.status(200).json({ message: `Welcome ${user.name} `, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
