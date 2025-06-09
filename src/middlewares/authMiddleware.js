const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Récupère le token depuis le header Authorization
  console.log('Token reçu:', token); // Log pour vérifier le token reçu

  if (!token) {
    console.log('Aucun token fourni'); // Log si aucun token n'est fourni
    return res.status(401).json({ error: 'Accès non autorisé. Aucun token fourni.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
    console.log('Token décodé avec succès:', decoded); // Log pour vérifier le contenu du token décodé
    req.user = decoded; // Ajoute les informations de l'utilisateur à la requête
    next();
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error); // Log pour afficher l'erreur
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expiré.' });
    }
    res.status(401).json({ error: 'Token invalide.' });
  }
};
