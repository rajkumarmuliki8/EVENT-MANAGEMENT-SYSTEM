const express = require('express');
const router = express.Router();
const { myRegistrations } = require('../controllers/registrationController');
const { authMiddleware } = require('../middleware/auth');

router.get('/mine', authMiddleware, myRegistrations);

module.exports = router;
