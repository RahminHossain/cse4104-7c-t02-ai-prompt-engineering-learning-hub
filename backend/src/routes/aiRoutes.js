const express = require('express');
const router = express.Router();
const { evaluate } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/evaluate', protect, evaluate);

module.exports = router;
