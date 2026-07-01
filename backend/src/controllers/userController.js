const User = require('../models/User');

const getProfile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

const updateProfile = async (req, res, next) => {
  try {
    const { name, bio } = req.body;
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (typeof name === 'string') {
      user.name = name;
    }

    if (typeof bio === 'string') {
      user.bio = bio;
    }

    await user.save();

    return res.status(200).json({ message: 'Profile updated', user });
  } catch (error) {
    return next(error);
  }
};

// Admin routes
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json({ users });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  deleteUser,
};
