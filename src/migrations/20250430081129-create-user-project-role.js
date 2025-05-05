'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Project_Roles', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      board_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Boards',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    });

    // Clé primaire composée
    await queryInterface.addConstraint('User_Project_Roles', {
      fields: ['user_id', 'board_id'],
      type: 'primary key',
      name: 'user_project_roles_pkey',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Project_Roles');
  },
};
