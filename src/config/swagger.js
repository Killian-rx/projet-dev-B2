const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Projet B2',
      version: '1.0.0',
      description: 'Documentation Swagger du projet',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // 👈 chemin vers les fichiers annotés
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
