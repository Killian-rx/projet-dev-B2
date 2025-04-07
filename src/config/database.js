const { Sequelize } = require('sequelize');  // On importe Sequelize
require('dotenv').config();  // Importation de dotenv pour accéder aux variables d'environnement

// Créer une instance de Sequelize avec les informations de connexion
const sequelize = new Sequelize({
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "host": process.env.DB_HOST,
  "dialect": "mysql",
});

module.exports = sequelize;
