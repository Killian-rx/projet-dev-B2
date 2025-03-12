const express = require('express');
const { sequelize } = require('./models'); // Import de l'instance Sequelize
const app = require('./app');

// ✅ Test de connexion à la base de données
sequelize.authenticate()
    .then(() => console.log('✅ Connexion réussie à la BDD Railway'))
    .catch(err => console.error('❌ Erreur de connexion', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
