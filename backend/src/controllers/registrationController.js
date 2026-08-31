const { Registration, Event, User } = require('../models');

// POST /api/events/:id/register  (participant registers for an event)
async function registerForEvent(req, res) {
  try {
    const eventId = req.params.id;
    const event = await Event.findByPk(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    const existing = await Registration.findOne({
      where: { eventId, participantId: req.user.id },
    });
    if (existing) {
      return res.status(409).json({ error: 'Already registered for this event' });
    }

    const registration = await Registration.create({
      eventId,
      participantId: req.user.id,
    });

    res.status(201).json({ registration });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/registrations/mine  (participant's own registered events)
async function myRegistrations(req, res) {
  try {
    const registrations = await Registration.findAll({
      where: { participantId: req.user.id },
      include: [{ model: Event, as: 'event' }],
    });
    res.json({ registrations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/admin/participants  (admin: view all participants + their registered events)
async function allParticipantRegistrations(req, res) {
  try {
    const registrations = await Registration.findAll({
      include: [
        { model: Event, as: 'event' },
        { model: User, as: 'participant', attributes: ['id', 'name', 'email'] },
      ],
      order: [['registered_at', 'DESC']],
    });
    res.json({ registrations });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { registerForEvent, myRegistrations, allParticipantRegistrations };
