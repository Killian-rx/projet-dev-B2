const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./users'); // Importer le modèle User

const Board = sequelize.define('Board', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING, // Stocke l'URL ou le chemin de l'image
        allowNull: true, // L'image est optionnelle
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Boards',
    timestamps: false, // Si ta table a déjà une colonne created_at
});

// Relation : Un board appartient à un utilisateur (owner)
Board.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' }); // Ajout d'un alias pour plus de clarté

module.exports = Board;
