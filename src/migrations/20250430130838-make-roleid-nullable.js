module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  }
};
