'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('boards', 'image', {
            type: Sequelize.STRING,
            allowNull: true, // L'image est optionnelle
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('boards', 'image');
    },
};
