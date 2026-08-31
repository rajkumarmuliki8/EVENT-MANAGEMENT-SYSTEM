const { Event, User, Registration } = require('../models');

// POST /api/events  (admin or participant, per project spec)
async function createEvent(req, res) {
  try {
    const { title, description, date, location, price } = req.body;
    if (!title || !date) {
      return res.status(400).json({ error: 'title and date are required' });
    }

    const event = await Event.create({
      title,
      description,
      date,
      location,
      price: price || 0,
      createdBy: req.user.id,
    });

    res.status(201).json({ event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/events  (list all, both roles)
async function listEvents(req, res) {
  try {
    const events = await Event.findAll({
      order: [['date', 'ASC']],
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'role'] }],
    });
    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET /api/events/:id
async function getEvent(req, res) {
  try {
    const event = await Event.findByPk(req.params.id, {
      include: [{ model: User, as: 'creator', attributes: ['id', 'name', 'role'] }],
    });
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json({ event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// DELETE /api/events/:id (only the creator or an admin)
async function deleteEvent(req, res) {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (req.user.role !== 'admin' && event.createdBy !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this event' });
    }

    await event.destroy();
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createEvent, listEvents, getEvent, deleteEvent };
