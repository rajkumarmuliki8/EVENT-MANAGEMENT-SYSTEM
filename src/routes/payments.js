const express = require('express');
const router = express.Router();
const { makePayment, myPayments } = require('../controllers/paymentController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, roleMiddleware('participant'), makePayment);
router.get('/mine', authMiddleware, roleMiddleware('participant'), myPayments);

module.exports = router;
