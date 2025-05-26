const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const List = require('./lists');  // Importer le modèle List
const User = require('./users');  // Importer le modèle User

const Card = sequelize.define('Card', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  list_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  assigned_user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'Cards',
  timestamps: false,  // Si ta table a déjà une colonne created_at
});

// Relation : Une carte appartient à une liste
Card.belongsTo(List, { foreignKey: 'list_id' });
// Relation : Une carte est assignée à un utilisateur (facultatif)
Card.belongsTo(User, { foreignKey: 'assigned_user_id', targetKey: 'id' });

module.exports = Card;
