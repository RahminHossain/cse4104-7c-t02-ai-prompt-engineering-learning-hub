const express = require('express');
const router = express.Router();
const { evaluate } = require('../controllers/aiController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/evaluate', authenticate, evaluate);

module.exports = router;
