const express = require('express');
const router = express.Router();
const { allParticipantRegistrations } = require('../controllers/registrationController');
const { allPayments } = require('../controllers/paymentController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.use(authMiddleware, roleMiddleware('admin'));

router.get('/participants', allParticipantRegistrations); // view participant events
router.get('/payments', allPayments);                     // view participant payments

module.exports = router;
