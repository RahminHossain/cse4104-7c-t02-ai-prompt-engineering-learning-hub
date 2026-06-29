const bcrypt = require('bcrypt');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const ApiError = require('../utils/ApiError');

const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedEmail) {
      throw new ApiError(400, 'Valid email is required');
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      throw new ApiError(409, 'User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role,
    });

    const token = generateToken({ userId: user._id, role: user.role });

    return res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (!normalizedEmail) {
      throw new ApiError(400, 'Valid email is required');
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid email or password');
    }

    const token = generateToken({ userId: user._id, role: user.role });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res) => res.status(200).json({ message: 'Logout successful. Remove token on client side.' });

module.exports = {
  register,
  login,
  logout,
};
