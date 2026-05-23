const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Hospital = require('./Hospital');

const Doctor = sequelize.define('Doctor', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    references: {
      model: User,
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
  specialization: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  experience: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  consultationFee: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  qualifications: {
    type: DataTypes.JSON,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
  },
  totalReviews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

Doctor.belongsTo(User, { foreignKey: 'userId' });
Doctor.belongsTo(Hospital, { foreignKey: 'hospitalId' });

module.exports = Doctor;
