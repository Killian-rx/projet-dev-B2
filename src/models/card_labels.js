const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CardLabel = sequelize.define('CardLabel', {
  card_id: { type: DataTypes.INTEGER, primaryKey: true },
  label_id: { type: DataTypes.INTEGER, primaryKey: true }
}, {
  tableName: 'card_labels',
  timestamps: false
});

module.exports = CardLabel;
