const express = require('express');
const { body, param } = require('express-validator');
const { getAllPrompts, getPromptById, createPrompt, updatePrompt, deletePrompt } = require('../controllers/marketplaceController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', authenticate, getAllPrompts);
router.get('/:id', authenticate, [param('id').isMongoId()], validateRequest, getPromptById);

router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty(),
    body('desc').notEmpty(),
    body('category').notEmpty(),
    body('authorName').notEmpty()
  ],
  validateRequest,
  createPrompt
);

router.put('/:id', authenticate, authorizeRoles('admin'), [param('id').isMongoId()], validateRequest, updatePrompt);
router.delete('/:id', authenticate, authorizeRoles('admin'), [param('id').isMongoId()], validateRequest, deletePrompt);

module.exports = router;
