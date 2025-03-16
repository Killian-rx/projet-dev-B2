const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Card = require('./Card');  // Importer le modèle Card
const Label = require('./Label');  // Importer le modèle Label

const Card_Label = sequelize.define('Card_Label', {
  card_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  label_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
}, {
  tableName: 'Card_Labels',
  timestamps: false,  // Cette table de relation n'a pas besoin de timestamps
});

// Relation : Un lien entre une carte et un label
Card_Label.belongsTo(Card, { foreignKey: 'card_id' });
Card_Label.belongsTo(Label, { foreignKey: 'label_id' });

module.exports = Card_Label;
