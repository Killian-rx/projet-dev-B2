'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User_Project_Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Un User_Project_Role appartient à un utilisateur (User)
      User_Project_Role.belongsTo(models.User, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
      });

      // Un User_Project_Role appartient à un projet (Board)
      User_Project_Role.belongsTo(models.Board, {
        foreignKey: 'board_id',
        onDelete: 'CASCADE',
      });

      // Un User_Project_Role appartient à un rôle (Role)
      User_Project_Role.belongsTo(models.Role, {
        foreignKey: 'role_id',
        onDelete: 'CASCADE',
      });
    }
  }

  User_Project_Role.init(
    {
      user_id: DataTypes.INTEGER,
      board_id: DataTypes.INTEGER,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User_Project_Role',
    }
  );

  return User_Project_Role;
};
