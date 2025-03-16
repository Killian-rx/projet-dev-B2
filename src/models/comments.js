const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');  // Importer le modèle User
const Card = require('./Card');  // Importer le modèle Card

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'Comments',
  timestamps: false,  // Si ta table a déjà une colonne created_at
});

// Relation : Un commentaire appartient à un utilisateur
Comment.belongsTo(User, { foreignKey: 'user_id' });
// Relation : Un commentaire appartient à une carte
Comment.belongsTo(Card, { foreignKey: 'card_id' });

module.exports = Comment;
