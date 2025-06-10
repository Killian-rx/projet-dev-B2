const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  card_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'Comments',
  timestamps: false
});

module.exports = Comment;
