const User = require('./User');
const Event = require('./Event');
const Registration = require('./Registration');
const Payment = require('./Payment');

// User <-> Event (creator)
User.hasMany(Event, { foreignKey: 'createdBy', as: 'createdEvents' });
Event.belongsTo(User, { foreignKey: 'createdBy', as: 'creator' });

// User <-> Registration <-> Event
User.hasMany(Registration, { foreignKey: 'participantId', as: 'registrations' });
Registration.belongsTo(User, { foreignKey: 'participantId', as: 'participant' });

Event.hasMany(Registration, { foreignKey: 'eventId', as: 'registrations' });
Registration.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

// Registration <-> Payment
Registration.hasOne(Payment, { foreignKey: 'registrationId', as: 'payment' });
Payment.belongsTo(Registration, { foreignKey: 'registrationId', as: 'registration' });

module.exports = { User, Event, Registration, Payment };
