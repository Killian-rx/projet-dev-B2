const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Récupère le token depuis le header Authorization

  if (!token) {
    return res.status(401).json({ error: 'Accès non autorisé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
    req.user = decoded; // Ajoute les informations de l'utilisateur à la requête
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide.' });
  }
};
