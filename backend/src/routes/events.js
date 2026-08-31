const express = require('express');
const router = express.Router();
const { createEvent, listEvents, getEvent, deleteEvent } = require('../controllers/eventController');
const { registerForEvent } = require('../controllers/registrationController');
const { authMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, listEvents);
router.get('/:id', authMiddleware, getEvent);
router.post('/', authMiddleware, createEvent); // admin or participant, per spec
router.delete('/:id', authMiddleware, deleteEvent);
router.post('/:id/register', authMiddleware, registerForEvent);

module.exports = router;
