const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User'); // Importer le modèle User

const Board = sequelize.define('Board', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'Boards',
  timestamps: false, // Si tu table a déjà une colonne created_at
});

// Relation : Un board appartient à un utilisateur (owner)
Board.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = Board;
