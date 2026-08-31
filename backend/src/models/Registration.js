const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'event_id',
    references: { model: 'events', key: 'id' },
  },
  participantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'participant_id',
    references: { model: 'users', key: 'id' },
  },
}, {
  tableName: 'registrations',
  underscored: true,
  timestamps: true,
  createdAt: 'registered_at',
  updatedAt: false,
  indexes: [
    { unique: true, fields: ['event_id', 'participant_id'] },
  ],
});

module.exports = Registration;
