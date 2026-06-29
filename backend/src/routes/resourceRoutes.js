const express = require('express');
const { body, param } = require('express-validator');
const {
  createResource,
  listResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', listResources);
router.get('/:id', [param('id').isMongoId().withMessage('Invalid resource id')], validateRequest, getResourceById);
router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  [
    body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
    body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
    body('level').isIn(['beginner', 'intermediate', 'advanced']).withMessage('Invalid level'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ],
  validateRequest,
  createResource
);
router.put(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  [param('id').isMongoId().withMessage('Invalid resource id')],
  validateRequest,
  updateResource
);
router.delete(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  [param('id').isMongoId().withMessage('Invalid resource id')],
  validateRequest,
  deleteResource
);

module.exports = router;
