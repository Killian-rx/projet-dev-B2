const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Sequelize model for user_project_role join table
const User_Project_Role = sequelize.define('User_Project_Role', {
  user_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  board_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
  role_id: { type: DataTypes.INTEGER, allowNull: false },
}, {
  tableName: 'User_Project_Roles',
  timestamps: false,
  // Disable the default 'id' primary key
  id: false,
});

// Associations
User_Project_Role.associate = (models) => {
  User_Project_Role.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
  User_Project_Role.belongsTo(models.Board, { foreignKey: 'board_id', onDelete: 'CASCADE' });
  User_Project_Role.belongsTo(models.Role, { foreignKey: 'role_id', onDelete: 'CASCADE' });
};

module.exports = User_Project_Role;
