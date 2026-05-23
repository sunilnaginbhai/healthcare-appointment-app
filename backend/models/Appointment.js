const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Doctor = require('./Doctor');
const Hospital = require('./Hospital');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  patientId: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: 'id',
    },
  },
  doctorId: {
    type: DataTypes.UUID,
    references: {
      model: Doctor,
      key: 'id',
    },
  },
  hospitalId: {
    type: DataTypes.UUID,
    references: {
      model: Hospital,
      key: 'id',
    },
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'no-show'),
    defaultValue: 'scheduled',
  },
  reason: {
    type: DataTypes.STRING,
  },
  notes: {
    type: DataTypes.TEXT,
  },
  consultationFee: {
    type: DataTypes.DECIMAL(10, 2),
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'completed', 'failed'),
    defaultValue: 'pending',
  },
  cancellationReason: {
    type: DataTypes.TEXT,
  },
  cancelledAt: {
    type: DataTypes.DATE,
  },
});

Appointment.belongsTo(User, { foreignKey: 'patientId', as: 'patient' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });
Appointment.belongsTo(Hospital, { foreignKey: 'hospitalId', as: 'hospital' });

module.exports = Appointment;
