const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Role model
const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  tableName: 'Roles',
  timestamps: true, // as per migration createdAt, updatedAt
});

module.exports = Role;
