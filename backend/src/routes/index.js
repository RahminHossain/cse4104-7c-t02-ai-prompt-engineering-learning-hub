const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const resourceRoutes = require('./resourceRoutes');
const challengeRoutes = require('./challengeRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Backend server is running' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/resources', resourceRoutes);
router.use('/challenges', challengeRoutes);

module.exports = router;
