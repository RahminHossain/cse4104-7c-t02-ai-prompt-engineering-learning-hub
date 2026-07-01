const express = require('express');
const { body, param } = require('express-validator');
const { getAllModules, getModuleById, createModule, updateModule, deleteModule } = require('../controllers/moduleController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', authenticate, getAllModules);
router.get('/:id', authenticate, [param('id').isMongoId()], validateRequest, getModuleById);

router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  [
    body('title').notEmpty(),
    body('desc').notEmpty(),
    body('level').isIn(['Beginner', 'Intermediate', 'Advanced']),
    body('lessons').isInt(),
    body('time').notEmpty()
  ],
  validateRequest,
  createModule
);

router.put('/:id', authenticate, authorizeRoles('admin'), [param('id').isMongoId()], validateRequest, updateModule);
router.delete('/:id', authenticate, authorizeRoles('admin'), [param('id').isMongoId()], validateRequest, deleteModule);

module.exports = router;
