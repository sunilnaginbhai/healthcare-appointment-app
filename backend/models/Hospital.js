const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hospital = sequelize.define('Hospital', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
  },
  zipCode: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  website: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  totalBeds: {
    type: DataTypes.INTEGER,
  },
  emergencyServices: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  operatingHours: {
    type: DataTypes.JSON,
  },
  facilities: {
    type: DataTypes.JSON,
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
  },
});

module.exports = Hospital;
