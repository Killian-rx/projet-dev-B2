const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User      = require('./users');

const Comment = sequelize.define('Comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  card_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'comments',
  timestamps: false,
});

// Association nécessaire pour `.include({ model: User, as: 'user' })`
Comment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Comment;
