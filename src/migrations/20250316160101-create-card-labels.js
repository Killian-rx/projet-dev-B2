module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Card_Labels', {
      card_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Cards', // Référence la table Cards
          key: 'id', // Clé primaire de Cards
        },
        onDelete: 'CASCADE',
      },
      label_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Labels', // Référence la table Labels
          key: 'id', // Clé primaire de Labels
        },
        onDelete: 'CASCADE',
      },
    });

    // Ajout de la clé primaire composée après la création de la table
    await queryInterface.addConstraint('Card_Labels', {
      fields: ['card_id', 'label_id'], // Les champs formant la clé primaire composée
      type: 'primary key',
      name: 'card_labels_pkey', // Optionnel : donne un nom à la contrainte
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Card_Labels');
  },
};
