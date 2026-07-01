const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const resourceRoutes = require('./resourceRoutes');
const challengeRoutes = require('./challengeRoutes');
const adminRoutes = require('./adminRoutes');
const moduleRoutes = require('./moduleRoutes');
const marketplaceRoutes = require('./marketplaceRoutes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Backend server is running' });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/resources', resourceRoutes);
router.use('/challenges', challengeRoutes);
router.use('/admin', adminRoutes);
router.use('/modules', moduleRoutes);
router.use('/marketplace', marketplaceRoutes);

module.exports = router;
