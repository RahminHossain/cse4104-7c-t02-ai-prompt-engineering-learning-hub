const express = require('express');
const { body, param } = require('express-validator');
const {
  createChallenge,
  listChallenges,
  getChallengeById,
  updateChallenge,
  deleteChallenge,
} = require('../controllers/challengeController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

router.get('/', listChallenges);
router.get('/:id', [param('id').isMongoId().withMessage('Invalid challenge id')], validateRequest, getChallengeById);
router.post(
  '/',
  authenticate,
  authorizeRoles('admin'),
  [
    body('title').trim().isLength({ min: 5 }).withMessage('Title must be at least 5 characters'),
    body('promptTask').trim().isLength({ min: 10 }).withMessage('Prompt task must be at least 10 characters'),
    body('expectedOutcome').trim().isLength({ min: 10 }).withMessage('Expected outcome must be at least 10 characters'),
    body('difficulty').isIn(['easy', 'medium', 'hard']).withMessage('Invalid difficulty'),
  ],
  validateRequest,
  createChallenge
);
router.put(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  [param('id').isMongoId().withMessage('Invalid challenge id')],
  validateRequest,
  updateChallenge
);
router.delete(
  '/:id',
  authenticate,
  authorizeRoles('admin'),
  [param('id').isMongoId().withMessage('Invalid challenge id')],
  validateRequest,
  deleteChallenge
);

module.exports = router;
