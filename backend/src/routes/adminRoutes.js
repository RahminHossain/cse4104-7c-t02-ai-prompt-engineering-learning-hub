const express = require('express');
const { getStats } = require('../controllers/adminController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', authenticate, authorizeRoles('admin'), getStats);

module.exports = router;
