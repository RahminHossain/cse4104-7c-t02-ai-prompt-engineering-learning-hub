const express = require('express');
const router = express.Router();
const { getSettings, updateSetting } = require('../controllers/settingsController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(authenticate, authorizeRoles('admin'), getSettings)
  .put(authenticate, authorizeRoles('admin'), updateSetting);

module.exports = router;
