const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  registrationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'registration_id',
    references: { model: 'registrations', key: 'id' },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  paidAt: {
    type: DataTypes.DATE,
    field: 'paid_at',
  },
}, {
  tableName: 'payments',
  underscored: true,
  timestamps: true,
});

module.exports = Payment;
