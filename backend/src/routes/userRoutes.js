const express = require('express');
const { body } = require('express-validator');
const { getProfile, updateProfile } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.put(
  '/profile',
  authenticate,
  [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('bio').optional().isLength({ max: 500 }).withMessage('Bio must be at most 500 characters'),
  ],
  validateRequest,
  updateProfile
);

module.exports = router;
