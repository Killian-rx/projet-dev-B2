const { Sequelize } = require('sequelize');  // On importe Sequelize

// Créer une instance de Sequelize avec les informations de connexion
const sequelize = new Sequelize({
  "username": "root",
  "password": "M@mb02o16!",
  "database": "projet-dev-B2",
  "host": "127.0.0.1",
  "dialect": "mysql",
});

module.exports = sequelize;
