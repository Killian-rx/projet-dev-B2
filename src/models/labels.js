const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Label = sequelize.define('Label', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Labels',
  timestamps: false
});

Label.associate = function(models) {
  Label.belongsToMany(models.Card, {
    through: 'card_labels',
    foreignKey: 'label_id',
    otherKey: 'card_id'
  });
};

module.exports = Label;
