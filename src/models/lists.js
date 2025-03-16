const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Board = require('./Board');  // Importer le modèle Board

const List = sequelize.define('List', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  board_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'Lists',
  timestamps: false,  // Si ta table a déjà une colonne created_at
});

// Relation : Une liste appartient à un board
List.belongsTo(Board, { foreignKey: 'board_id' });

module.exports = List;
