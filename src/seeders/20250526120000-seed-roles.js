// filepath: src/seeders/20250526120000-seed-roles.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Seed default roles
    await queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: 'Owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Member',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Remove seeded roles
    await queryInterface.bulkDelete('Roles', {
      id: { [Sequelize.Op.in]: [1, 2] }
    }, {});
  }
};
