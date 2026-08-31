const { Payment, Registration, Event, User } = require('../models');

// POST /api/payments  { registrationId }
// Simulates payment processing (swap this for a real Stripe/Razorpay call later).
async function makePayment(req, res) {
  try {
    const { registrationId } = req.body;
    if (!registrationId) {
      return res.status(400).json({ error: 'registrationId is required' });
    }

    const registration = await Registration.findByPk(registrationId, {
      include: [{ model: Event, as: 'event' }],
    });
    if (!registration) return res.status(404).json({ error: 'Registration not found' });

    if (registration.participantId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to pay for this registration' });
    }

    let payment = await Payment.findOne({ where: { registrationId } });
    if (payment && payment.status === 'completed') {
      return res.status(409).json({ error: 'Payment already completed' });
    }

    const amount = registration.event.price;

    if (payment) {
      payment.status = 'completed';
      payment.amount = amount;
      payment.paidAt = new Date();
      await payment.save();
    } else {
      payment = await Payment.create({
        registrationId,
        amount,
        status: 'completed',
        paidAt: new Date(),
      });
    }

    res.json({ payment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/payments/mine  (participant's own payment history)
async function myPayments(req, res) {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Registration,
          as: 'registration',
          where: { participantId: req.user.id },
          include: [{ model: Event, as: 'event' }],
        },
      ],
      order: [['created_at', 'DESC']],
    });
    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/admin/payments  (admin: view all participant payments)
async function allPayments(req, res) {
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Registration,
          as: 'registration',
          include: [
            { model: Event, as: 'event' },
            { model: User, as: 'participant', attributes: ['id', 'name', 'email'] },
          ],
        },
      ],
      order: [['created_at', 'DESC']],
    });
    res.json({ payments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { makePayment, myPayments, allPayments };
