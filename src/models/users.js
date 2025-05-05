const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Roles',  // Nom de la table associée
      key: 'id',       // Clé primaire de la table Roles
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'Users',
  timestamps: false,  // Utilisé si tu n'as pas de colonne `updated_at` dans ta table
});

User.associate = (models) => {
  User.belongsTo(models.Role, { foreignKey: 'role_id' });
  User.hasMany(models.User_Project_Role, { foreignKey: 'user_id' });
};


module.exports = User;
