// src/migrations/20230316000000-create-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      role_id: { // Nouvelle colonne pour faire référence à la table 'Roles'
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Roles', // La table associée
          key: 'id',      // La clé primaire de la table 'Roles'
        },
        onDelete: 'CASCADE', // Si un rôle est supprimé, les utilisateurs associés seront aussi supprimés
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  },
};
