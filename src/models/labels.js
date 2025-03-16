const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Label = sequelize.define('Label', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING(7),
    allowNull: false,  // Par exemple, une couleur au format hexadécimal "#ff0000"
  }
}, {
  tableName: 'Labels',
  timestamps: false,  // Pas besoin de `created_at` si c'est une table de labels simple
});

module.exports = Label;
